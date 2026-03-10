<script setup lang="ts">
import { ProductType, type ShoppingListItem } from '@/types';
import { computed, onMounted, reactive } from 'vue';


defineEmits(['addNewProduct']);

const newShopItem = reactive<ShoppingListItem>({} as ShoppingListItem);
function isEmpty(value: string): boolean {
  return !value || value.trim() === "";
}

const isFormInValid = computed(() => {
  return (isEmpty(newShopItem.name) || isEmpty(newShopItem.brand)) ;
} )

onMounted(async () => {
  newShopItem.qty = 1;
  newShopItem.price = 0.01;
  newShopItem.type = ProductType.Other;
})

</script>
<template>
    <tr >
      <td><input name="qty" class="fitNumbers" v-model="newShopItem.qty" type="number" min="1" placeholder="1" /></td>
      <td><input maxlength="32" style="min-width: 12ch;  width:fit-content; max-width: 18ch;" name="name"  v-model="newShopItem.name" type="text" placeholder="Product" autocomplete="off"/></td>
      <td><input maxlength="32" style="min-width: 06ch; width: fit-content; max-width: 12ch;" name="brand" v-model="newShopItem.brand" type="text" placeholder="Brand " /></td>
      <td style="text-align: right; width: auto; max-width: 15ch;"><input name="price" class="fitNumbers"  style="text-align: right; max-width: 10ch;" v-model="newShopItem.price" type="number" min="0.01" step="0.01" value="0.01" placeholder="0.01" /> €</td>
        <td>
          <select name="type" v-model="newShopItem.type" style="width: fit-content; min-width: 30px; max-width: max-content;">
          <option  v-for="product in ProductType" v-bind:value="product" v-bind:key="product">{{ product }}</option>
        </select>
    </td>
    <td>
      <button style="padding: 5px" v-on:click="$emit('addNewProduct', newShopItem)" v-bind:disabled="isFormInValid">➕ </button>
    </td>
  </tr>
</template>
<style scoped>
.fitNumbers{
  min-width: 3ch;
  width: auto;
  max-width: 10ch;
  text-align: right;
  direction: rtl;
}
input, select {
  padding: 0.45rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
    }
  input:focus, select:focus { border-color: #4a90e2; outline: none; box-shadow: 0 0 0 2px rgba(74,144,226,0.2); }
</style>
