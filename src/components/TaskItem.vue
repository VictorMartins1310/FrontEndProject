<script setup lang="ts">
import type { TaskList } from '@/types';
import { useTodoStore } from '@/stores/todoLists';
import { onMounted, ref } from 'vue';
const props = defineProps<{todoID: number}>();
const todo = useTodoStore();
const task = ref<TaskList>({} as TaskList);

let creationDate: Date = new Date();
let loaded = ref(false);

onMounted(async () => {
  console.log("TaskList, ID: " + props.todoID);
      task.value = await todo.getTaskList(props.todoID).finally(() => loaded.value = true );
      creationDate = new Date(task.value.creationDate);
  });


</script>
<template>
  <h1 v-if="!loaded">Loading...</h1>
  <table v-else style="width: 100%;">
     <thead>
      <tr>
        <th>Creation Date</th>
        <th>Task</th>
        <th>Frequency</th>
      </tr>
     </thead>
     <tbody>
      <tr>
  <td>{{ creationDate.toLocaleDateString() }}</td>
  <td>{{ task.task }}</td>
  <td>{{ task.frequency }}</td>
  </tr></tbody>
</table>
  </template>
<style scoped>
</style>
