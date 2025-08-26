<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists';
import {  ref } from 'vue';

const antwort = ref({
    todoListName: ""
});

const todoStore = useTodoStore();

let type = ref("TaskList");

</script>

<template>
    <form v-on:submit.prevent>
        <label>Name: </label><input type="text" v-model="antwort.todoListName" />
        <select v-model = "type">
            <option value="TaskList" selected>Task List</option>
            <option value="ShoppingList">Shopping List</option>
        </select>
        <input v-if="type === 'TaskList'" type="submit" value="Senden Task" v-on:click="todoStore.newTaskList()" />
        <input v-if="type === 'ShoppingList'" type="submit" value="Senden Shop" v-on:click="todoStore.newShoppingList()" />
    </form>
</template>
