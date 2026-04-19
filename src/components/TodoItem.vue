<script setup lang="ts">
import ShoppingListItem from './ShoppingListItem.vue';
import TaskItem from './TaskItem.vue';

const todoItem = defineProps<{
    type: string,
    todoid: number
  }>();


</script>
<template>
  <TaskItem v-if="todoItem.type === 'Task'" :todoID="todoItem.todoid"/>
  <ShoppingListItem v-if="todoItem.type === 'ShoppingList'" :todoID="todoItem.todoid"/>
</template>