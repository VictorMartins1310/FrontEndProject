<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists';
import type { TodoItem } from '@/types';
import { computed, ref } from 'vue'

 const antwort = ref({
   type: "Task",
   task: '',
 })

const todoStore = useTodoStore();

const type = ref('TaskList');


const newTaskItem: TodoItem = {
  todoID: 0,
  type: type.value,
  completed: false,
  creationDate: new Date()
}

const buttonDisabled = computed(() => {
  if ( antwort.value.task === "") return true;
  return false;
})

const formView = ref(false);

async function save() {
  if (type.value === "TaskList") {
    await todoStore.newTaskList(antwort.value.task);
  } else if (type.value === "ShoppingList") {
    await todoStore.newShoppingList(antwort.value.task);
  }
  formView.value = false;
}

</script>

<template>
  <button v-show="!formView" style="padding: 12px;" v-on:click="formView = true">Add ➕</button>
  <form v-show="formView" v-on:submit.prevent>
    <select v-model="type">
      <option value="TaskList" selected>Task List</option>
      <option value="ShoppingList">Shopping List</option>
    </select>
    <div v-if="type === 'TaskList'">
      <label>Name: </label>
      <input type="text" v-model="antwort.task" placeholder="To - Do List Name" />
      <input  v-if="type === 'TaskList'" type="submit" value="💾 Save"  v-on:click="save()" v-bind:disabled="buttonDisabled" />
  </div>
  <div v-else>
      <label>Name: </label>
      <input type="text" v-model="antwort.task" placeholder="To - Do List Name" />
      <input v-if="type === 'ShoppingList'" type="submit" value="Senden Shop" v-on:click="save()" v-bind:disabled="buttonDisabled"  />
    </div>
    <input type="date" :value="newTaskItem.creationDate.toISOString().split('T')[0]" />
  </form>
</template>
