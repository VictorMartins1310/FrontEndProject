<script setup lang="ts">
import type { ShoppingList, ShoppingListItem, TaskList } from '@/types';
import { computed, ref } from 'vue'
import NewProduct from './NewProduct.vue';

const type = ref('Task');

const emit = defineEmits(['sendNewItem']);

const newShopingListItem = ref<ShoppingList>({
  todoID: 0,
  type: "ShoppingList",
  completed: false,
  creationDate: new Date(),
  marketName: "",
  products: []
});

const newTaskItem = ref<TaskList>({
  todoID: 0,
  type: "Task",
  completed: false,
  creationDate: new Date(),
  task: "",
  frequency: "Once"
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

const productList = ref([] as ShoppingListItem[]);

async function addFromEmit(newShopItem: ShoppingListItem) {
  const tmp: ShoppingListItem = {
    productID: 1,
    name: newShopItem.name,
    brand: newShopItem.brand,
    type: newShopItem.type,
    qty: newShopItem.qty,
    price: newShopItem.price,
    bought: false
  };
  console.log(newShopItem);
  productList.value.push(tmp);
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
  <label>Frequency</label>
  <select v-if="type === 'Task'">
      <option value="Once" selected>Once</option>
      <option value="Daily">Daily</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
    </select>
    <input v-if="type === 'ShoppingList'" type="date" :value="newShopingListItem.creationDate.toISOString().split('T')[0]" />
    <input v-if="type === 'Task'" type="date" :value="newTaskItem.creationDate.toISOString().split('T')[0]" />
    <div v-if="type === 'ShoppingList'">
      <h1>Products</h1>
      <h3 v-for="product in productList" :key="product.productID"> {{ product.name }} - {{ product.brand }} - {{ product.type }} - {{ product.qty }}</h3>
      <NewProduct v-on:addNewProduct="addFromEmit"/>
    </div>
    <input  type="submit" value="💾 Save"  v-on:click="save()" v-bind:disabled="buttonDisabled" />
  </form>
</template>
