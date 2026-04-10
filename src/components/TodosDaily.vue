<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists';
import { Frequency, type ShoppingList, type TaskList, type TodoListItem } from '@/types';
import { onMounted, reactive, ref, watch } from 'vue';
import TodoItem from './TodoItem.vue';

const 
    todayTodosList = reactive([] as TodoListItem[]),
    todosList = reactive([] as TodoListItem[]),
    todoStore = useTodoStore();
let 
    props = defineProps<{selectedDay: Date}>(),
    selectedDay = ref(props.selectedDay);

watch(() => props.selectedDay, async (newVal) => {
  selectedDay.value = newVal;
  console.log("SELECTED DAY: ", selectedDay.value);
  await loadTodayItems();
});

async function getTaskList(id: number){
  return await todoStore.getTaskList(id);
}

async function getShoppingList(id: number){
  return await todoStore.getShoppingList(id);
}

async function loadTodayItems(){
  const n = todosList.length;
  if (n > 0){
    console.log("N: ", n);
    todosList.splice(0, n);
  }
  const { data } = await todoStore.loadItems();
  const length = data.length;
  for (let i = 0; i<length; i++){
    let doOnDay = new Date(data[i].doOnDay);
    let todoItem;
    if (data[i].type === "Task"){
      todoItem = await todoStore.getTaskList(data[i].todoID);
      if (todoItem.frequency === Frequency.Daily || doOnDay.toDateString() === props.selectedDay.toDateString())
        todosList.push(todoItem);
    }
    else if (data[i].type === "ShoppingList"){
      if (doOnDay.toDateString() === props.selectedDay.toDateString())
        todosList.push(todoItem);
    }
  }
}

onMounted(async () => {
  await loadTodayItems();
  console.log("SELECTED DAY: ", selectedDay.value);
})

</script>
<template>
  <ol>
    <li v-for="(element) in todayTodosList" v-bind:key="element.todoID">
      <TodoItem v-bind:type="element.type" v-bind:id="element.todoID" v-bind:selected-day="selectedDay" />
      <div style="padding: 15px; display:grid; gap: 5px;">
        <button v-if="element.type === 'Task'">✔ Done</button>
        <button onclick="alert('Nicht Verfügbar')">📝 Edit</button>
        <button v-if="element.type === 'ShoppingList'" v-on:click="todoStore.deleteShoppingList(element.todoID)">❌ Delete</button>
      </div>
    </li>
  </ol>
</template>

<style lang="css" src="../assets/TodoList.css">
</style>