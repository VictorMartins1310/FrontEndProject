<script setup lang="ts">
import { Frequency, type TaskList } from '@/types';
import { useTodoStore } from '@/stores/todoLists';
import { onMounted, ref } from 'vue';
const props = defineProps<{todoID: number}>();
const todo = useTodoStore();
const task = ref<TaskList>({} as TaskList);

let doOnDay: Date = new Date();
let loaded = ref(false);

onMounted(async () => {
  task.value = await todo.getTaskList(props.todoID).finally(() => loaded.value = true );
  doOnDay = new Date(task.value.creationDate);
});

</script>
<template>
  <h1 v-if="!loaded">Loading...</h1>
  <div v-else>
    <p v-if="task.frequency === (Frequency.Daily || Frequency.Once)" >Do on this Day: {{ task.task }}</p>
    <p v-else-if="task.frequency === Frequency.Weekly" >At this Week: {{ task.task }}</p>
    <p v-else>Do on Day: {{ doOnDay.toLocaleDateString() }}, {{ task.task }}, {{ task.frequency }}</p>
  </div>
</template>
<style scoped>
</style>
