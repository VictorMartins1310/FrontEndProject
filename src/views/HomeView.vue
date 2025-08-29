<script setup lang="ts">
import NewList from '@/views/NewList.vue';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useTodoStore } from '@/stores/todoLists';


const todoStore = useTodoStore();
//const listLoaded = ref<boolean>(false);

const listLoaded = computed(() => {
  return todoStore.todoLists.length > 0;
});


</script>

<template>
  <button v-if="!listLoaded" v-on:click="loadLists()">Reload</button>
  <button>New List</button>
  <h1>TodoLists</h1>
  <p v-if="!listLoaded">Loading...</p>
  <table v-else >
    <thead>
      <tr>
        <th>Creation Date</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="element in todoStore.todoLists" v-bind:key="element.todoListID">
            <td>{{ new Date(element.creationDate).toLocaleString() }} </td>
            <td>
              <RouterLink v-bind:to="element.type + '/' + element.todoListID" v-bind:toDoListID="Number(element.todoListID)" v-bind:toDotype="element.type"> {{ element.todoListName }}</RouterLink>
            </td>
            <td><button v-on:click="todoStore.deleteTodoList(element.todoListID, element.type)">delete</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
      <NewList />
</template>
