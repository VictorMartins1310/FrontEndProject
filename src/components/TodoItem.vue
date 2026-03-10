<script setup lang="ts">
import ShoppingListItem from './ShoppingListItem.vue';
import TaskItem from './TaskItem.vue';

const props = defineProps<{
    type: string,
    id: number
}>();
</script>
<template>
    <TaskItem v-if="props.type === 'Task'" :todoID="props.id"/>
    <ShoppingListItem v-if="props.type === 'ShoppingList'" :todoID="props.id"/>
</template>