<script setup lang="ts">
import NewShoppingListItem from '@/components/NewItemList.vue';
import { useTodoStore } from '@/stores/todoLists';
import { onMounted } from 'vue';

const props = defineProps<{toDoListID: number, toDotype: string}>();

const todoStore = useTodoStore();

async function loadData() {
  await todoStore.loadItems(props.toDotype, props.toDoListID);
}

onMounted(async () =>
{
    loadData();
})
</script>

<template>
    <button v-on:click="loadData()">Reload</button>
    <form v-on:submit.prevent>
      <table>
        <thead v-if="toDotype==='shoppinglist'">
          <tr>
            <th colspan="5">
              Shopping Liste: {{ todoStore.shoppingList.todoListName }} |
              Creation Date: {{ new Date(todoStore.shoppingList.creationDate ).toLocaleString() }} |
              Active: {{ todoStore.shoppingList.active }} |
              marketName: {{ todoStore.shoppingList.marketName }}
            </th>
          </tr>
          <tr>
            <th>name</th><th>brand</th><th>price</th><td>qty</td><td>type</td>
          </tr>
        </thead>
        <thead v-if="toDotype==='tasklist'">
          <tr>
            <th>
              {{ todoStore.taskList.todoListName }}
              {{ new Date(todoStore.taskList.creationDate).toLocaleString() }}
              {{ todoStore.taskList.active }}
            </th>
          </tr>
       </thead>
       <tbody v-if="toDotype==='shoppinglist'">
          <tr v-for="item in todoStore.shoppingListItems" v-bind:key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.price }} €</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.type }}</td>
          </tr>
      </tbody>
      <tbody v-if="toDotype==='tasklist'">
          <tr v-for="item in todoStore.taskListItems" v-bind:key="item.task">
            <td>{{ item.task }}</td>
            <td></td>
          </tr>
      </tbody>
      <tfoot>
        <NewShoppingListItem v-bind:toDoListID="Number(toDoListID)" v-bind:toDotype="toDotype" />
      </tfoot>
    </table>
  </form>
</template>

<style scoped>
tbody tr:hover {
  scale: 1.05;
}
</style>
