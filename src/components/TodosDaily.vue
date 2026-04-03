<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists';
import { Frequency, type ShoppingList, type TaskList, type TodoListItem } from '@/types';
import { onMounted, reactive, ref, watch } from 'vue';
import TodoItem from './TodoItem.vue';

const 
    todayTodosList = reactive([] as TodoListItem[]),
    todoStore = useTodoStore();
let 
    props = defineProps<{selectedDay: Date}>(),
    selectedDay = ref(props.selectedDay);

watch(() => props.selectedDay, async (newVal) => {
  selectedDay.value = newVal;
  await loadTodayItems();
});

async function getTaskList(id: number){
  return await todoStore.getTaskList(id);
}

async function getShoppingList(id: number){
  return await todoStore.getShoppingList(id);
}


onMounted(async () => {
    await loadTodayItems();
    console.log(selectedDay.value);
})

</script>
<template>
  <ol>
    <li v-for="(element) in todayTodosList" v-bind:key="element.todoID">
      <TodoItem v-bind:type="element.type" v-bind:id="element.todoID" />
      <div style="padding: 15px; display:grid; gap: 5px;">
        <button v-if="element.type === 'Task'">✔ Done</button>
        <button onclick="alert('Nicht Verfügbar')">📝 Edit</button>
        <button v-if="element.type === 'ShoppingList'" v-on:click="todoStore.deleteShoppingList(element.todoID)">❌ Delete</button>
      </div>
    </li>
  </ol>
</template>

<style lang="css" scoped>
button {
  width: fit-content;
}
</style>