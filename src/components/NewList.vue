<script setup lang="ts">
import type { ShoppingList, TaskList } from '@/types';
import { computed, ref } from 'vue'
import NewProduct from './NewProduct.vue';

const type = ref('Task');

const emit = defineEmits(['sendNewItem']);

const newShopingListItem = ref<ShoppingList>({
  todoID: 0,
  type: type.value,
  completed: false,
  creationDate: new Date(),
  marketName: "",
  products: []
});

const newTaskItem = ref<TaskList>({
  todoID: 0,
  type: type.value,
  completed: false,
  creationDate: new Date(),
  task: "",
  done: false
});

const buttonDisabled = computed(() => {
  if (!newTaskItem.value.task && !newShopingListItem.value.marketName) return true;
  return false;
})


async function save() {
  if (type.value === "ShoppingList") {
    newShopingListItem.value.type = type.value
    emit('sendNewItem', newShopingListItem.value);
  } else if (type.value === "Task") {
    newTaskItem.value.type = type.value;
    emit('sendNewItem', newTaskItem.value);
  }
}

</script>
<template>
  <form v-on:submit.prevent>
    <select v-model="type">
      <option value="Task" selected>Task List</option>
      <option value="ShoppingList">Shopping List</option>
    </select>
    <div>
      <label>Task </label>
      <input type="text" v-if="type ==='Task'" v-model="newTaskItem.task" placeholder="To - Do List Name" />
      <input type="text" v-else v-model="newShopingListItem.marketName" placeholder="Market Name" />
  </div>
  <select>
      <option value="Once" selected>Once</option>
      <option value="Daily">Daily</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
    </select>
    <input type="date" :value="newTaskItem.creationDate.toISOString().split('T')[0]" />
    <input  type="submit" value="💾 Save"  v-on:click="save()" v-bind:disabled="buttonDisabled" />
    <NewProduct v-if="type === 'ShoppingList'"/>
  </form>
</template>
