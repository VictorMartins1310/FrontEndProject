<script setup lang="ts">
import type { ShoppingList, ShoppingListItem } from '@/types';
import { useTodoStore } from '@/stores/todoLists';
import { computed, onMounted, ref } from 'vue';
import NewProductItem from './NewProduct.vue';

const props = defineProps<{todoID: number}>();
const todoStore = useTodoStore();
const shoppingList = ref<ShoppingList>({} as ShoppingList);
const productList = ref<ShoppingListItem []>([] as ShoppingListItem[]);
let creationDate: Date = new Date();

const nProdutcs = computed(() => {
  return productList.value.length
});

async function addFromEmit(newShopItem: ShoppingListItem) {
  console.log(newShopItem);
  let toSave: ShoppingListItem = {} as ShoppingListItem;
  toSave ={
    productID: 0,
    name: newShopItem.name,
    brand: newShopItem.brand,
    price: newShopItem.price,
    qty: newShopItem.qty,
    type: newShopItem.type,
    bought: false
  };
  await todoStore.addShopItem(props.todoID, toSave);
  productList.value.push(toSave);
  newShopItem.name = "";
  newShopItem.brand = "";
  newShopItem.price = 0.01;
  newShopItem.qty = 1;
  newShopItem.type = "Other";
  newShopItem.bought = false;

}

onMounted(async () => {
  shoppingList.value = await todoStore.getShoppingList(props.todoID);
  creationDate = new Date(shoppingList.value.creationDate);
      shoppingList.value.products.forEach(eleme => {
      productList.value.push(eleme);
    })

  isProductListVisible.value.text = "Show " + nProdutcs.value + " Products"
});

const isProductListVisible = ref({
  visible: false,
  text: "Show " + nProdutcs.value +" Products"
});

async function showProductList(){
  const text = " " + nProdutcs.value + " Products";
  if (isProductListVisible.value.visible) {
    isProductListVisible.value.text = "Show" + text;
    isProductListVisible.value.visible = false;
  } else {
    isProductListVisible.value.text = "Hide" + text;
    isProductListVisible.value.visible = true;
  }
}

const addNewProduct = ref(false);;
</script>
<template>
  <h2>
    {{ shoppingList.marketName }}
    {{ creationDate.toDateString() }}
  <input v-if="nProdutcs > 0" type="button" v-on:click="showProductList()" v-bind:value="isProductListVisible.text"  />
</h2>
 <table style="width: 100%;">
    <thead>
      <tr v-show="isProductListVisible.visible">
        <th>Qty</th>
        <th>Name</th>
        <th>Brand</th>
        <th>Price</th>
        <th>Type</th>
        <th></th>
      </tr>
      </thead>
    <tbody>
    <tr v-show="isProductListVisible.visible" v-for="product in productList" :key="product.productID">
      <td style="text-align: right;">{{ product.qty }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.brand }}</td>
      <td style="width: auto; max-width: 16ch; text-align: right;">{{ product.price }} €</td>
      <td>{{ product.type }}</td>
      <td><button style="padding: 7px;">✔</button></td>
    </tr>
    <NewProductItem v-if="addNewProduct" v-on:addNewProduct="addFromEmit" />
    <tr>
      <td colspan="6" style="text-align : center;">
        <button v-if="!addNewProduct" v-on:click="addNewProduct=true">➕ Add Product</button>
        <button v-if="addNewProduct" v-on:click="addNewProduct=false">Done</button>
      </td>
    </tr>
    </tbody>
  </table>

  </template>
<style scoped>
td{
    /* display: flex;
    flex-wrap: wrap; */
    gap: 5px;
  }

</style>
