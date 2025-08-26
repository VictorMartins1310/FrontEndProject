<script setup lang="ts">
import NewList from '@/views/NewList.vue';
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useTodoStore } from '@/stores/todoLists';


const todoStore = useTodoStore();
//const listLoaded = ref<boolean>(false);

const listLoaded = computed(() => {
  return todoStore.todoLists.length > 0;
});

async function loadLists() {
  await todoStore.loadTodoLists();
}

onMounted(async () => {
  loadLists();
})

</script>

<template>
  <button v-if="!listLoaded" v-on:click="loadLists()">Reload</button>
  <button>New List</button>
  <h1>TodoLists</h1>
  <p v-if="!listLoaded">Loading...</p>
  <RouterLink v-else v-for="element in todoStore.todoLists"
    v-bind:key="element.todoListID"
    v-bind:to="element.type + '/' + element.todoListID"
    v-bind:toDoListID="Number(element.todoListID)"
    v-bind:toDotype="element.type">
        Name: {{ element.todoListName }} |
        Creation Date: {{ new Date(element.creationDate).toLocaleString() }}
  </RouterLink>
  <NewList />
</template>
