<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists';
import { computed, onMounted, ref } from 'vue';

async function getTypes(): Promise<string[]>{
    const data = await fetch("http://localhost:8710/types", {
      method: 'GET',
    })
    return await data.json() as string[];
}

const allTypes = ref<string[]>([]);


const todoStore = useTodoStore();

onMounted(async() =>{
  allTypes.value = await getTypes();
  todoStore.shoppingItem.type = allTypes.value[0];
})

const props = defineProps<{toDoListID: number, toDotype: string}>();
const isFormNotValid = computed(() => {
  return (todoStore.shoppingItem.name === "" || todoStore.shoppingItem.brand === "") && todoStore.taskItem.task === "" ;
} )


</script>

<template>
  <tr v-if="props.toDotype === 'shoppinglist'">
    <td><input name="name" v-model="todoStore.shoppingItem.name" type="text" placeholder="Product" autocomplete="off"/></td>
    <td><input name="brand" v-model="todoStore.shoppingItem.brand" type="text" placeholder="Brand " /></td>
    <td><input name="price" style="width: min-content;"  v-model="todoStore.shoppingItem.price" type="number" min="0.01" step="0.01" value="0.01" /> €</td>
    <td><input name="qty" v-model="todoStore.shoppingItem.qty" type="number" min="1" /></td>
    <td>
      <select name="type" v-model="todoStore.shoppingItem.type">
        <option  v-for="value in allTypes" v-bind:value="value" v-bind:key="value">{{ value }}</option>
      </select>
    </td>
    <td><button v-on:click="todoStore.addShopItem(toDoListID)" v-bind:disabled="isFormNotValid">Add</button></td>
  </tr>
    <tr v-else-if="toDotype === 'tasklist'" v-on:submit.prevent>
        <td><label>Task</label><input v-model="todoStore.taskItem.task" type="text" placeholder="Product" /></td>
        <td><button v-on:click="todoStore.addTaskItem(toDoListID)" v-bind:disabled="isFormNotValid">Add</button></td>
    </tr>
</template>
