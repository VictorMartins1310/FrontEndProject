<script setup lang="ts">
import { Frequency, type TaskList, type TodoListItem } from '@/types';
import ShoppingListItem from './ShoppingListItem.vue';
import TaskItem from './TaskItem.vue';
import { onMounted, ref } from 'vue';
import { useTodoStore } from '@/stores/todoLists';

const props = defineProps<{
    selectedDay: Date
  }>(),
  todosList = ref([] as TodoListItem[]),
  todoStore = useTodoStore();


async function loadTodayItems(){
  const n = todosList.value.length;
  if (n > 0){
    console.log("N: ", n);
    todosList.value.splice(0, n);
  }
  const { data } = await todoStore.loadItems();
  const length = data.length;
  for (let i = 0; i<length; i++){
    let doOnDay = new Date(data[i].doOnDay);
    let todoItem;
    if (data[i].type === "Task"){
      todoItem = await todoStore.getTaskList(data[i].todoID);
      if (todoItem.frequency === Frequency.Daily || doOnDay.toDateString() === props.selectedDay.toDateString())
        todosList.value.push(todoItem);
    }
    else if (data[i].type === "ShoppingList"){
      if (doOnDay.toDateString() === props.selectedDay.toDateString())
        todosList.value.push(todoItem);
    }
  }
}

onMounted(async () => {
  console.log("SELECTED DAY in TodoITEM: ", props.selectedDay)
  loadTodayItems();
})


</script>
<template>
    <tbody class="rounded">
      <tr v-for="todoItem in todosList">
        <td style="text-align: center; width: min-content;"></td>
        <td class="todoItemCell">
            <TaskItem v-if="todoItem.type === 'Task'" :todoID="todoItem.todoID"/>
            <ShoppingListItem v-if="todoItem.type === 'ShoppingList'" :todoID="todoItem.todoID"/>
        </td>
        <td></td>
      </tr>
    </tbody>
</template>