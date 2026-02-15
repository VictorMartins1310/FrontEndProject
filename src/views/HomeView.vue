<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists'
import ShoppingListItem from '@/components/ShoppingListItem.vue';
import TaskItem from '@/components/TaskItem.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import type { ShoppingList, TaskList, TodoItem } from '@/types';
import NewList from '@/components/NewList.vue';

const todoStore = useTodoStore();

const emit = defineEmits(['showNewItemForm', 'newNotification']);
const props = defineProps<{
  showNewItemForm: boolean
}>();


const todoList = reactive([] as TodoItem[]);
const completedTasks = reactive([] as TodoItem[]);

const today = new Date();
const date1 = ref(today);
const date2 = ref(new Date(today.setDate(today.getDate() + 7)));

onMounted(async() => {
  const data = await loadItems();
  data.forEach((element: TodoItem) => {
    if (!element.completed) todoList.push(element);
    else completedTasks.push(element);
    })
    if (todoStore.todoList.length > 0)
      emit('newNotification', "Quantity of tasks", "You have " + todoStore.todoList.length + " Tasks to do!");
})

async function loadItems() {
  return await todoStore.loadItems();
}

async function markDone(index: number, task: TodoItem) {
  await todoStore.setTaskDone(task.todoID);
  completedTasks.push(task);
  todoList.splice(index, 1);
}

async function markUndone(index: number, task: TodoItem){
  await todoStore.setTaskDone(task.todoID);
  todoList.push(task);
  completedTasks.splice(index, 1);
}

const viewTasksDone = ref(false);

const nTodoItems = computed(() => {
  return todoStore.todoList.length;
})

async function getData(data: ShoppingList | TaskList) {
  if (data.type === "Task") {
    await todoStore.addTaskItem(data);
  } else if (data.type === "ShoppingList") {
     await todoStore.newShoppingList(data.marketName);
  }
  console.log(data);
  emit('showNewItemForm', false);
}

</script>

<template>
  <table>
    <thead>
      <tr>
        <th style="text-align: left; padding: 20px;">
          <h1>TodoLists</h1>
          </th>
          <th><button v-on:click="loadItems()">Load TodoLists</button></th>
          <th></th>
      </tr>
      <tr>
        <th colspan="3">
          <input type="date" v-model="date1.toISOString().split('T')[0]"/>
          <input type="date" v-model="date2.toISOString().split('T')[0]"/>
        </th>
      </tr>
    </thead>
    <tbody v-if="props.showNewItemForm" class="rounded">
      <tr>
        <td><h1>0</h1></td>
        <td class="todoItemCell"><NewList v-on:send-new-item="getData"/></td>
        <td></td>
      </tr>
      </tbody>
      <tbody v-if="!props.showNewItemForm" class="rounded">
      <tr v-for="(element, index) in todoList" v-bind:key="element.todoID" >
        <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
        <td class="todoItemCell">
          <ShoppingListItem v-if="element.type === 'ShoppingList'" :elem="element"/>
          <TaskItem v-if="element.type === 'Task'" :elem="element"/>
        </td>
        <td v-if="element.type === 'ShoppingList' || element.type === 'Task'">
          <div style="padding: 15px; display:grid; gap: 5px;">
          <button v-if="element.type === 'Task'" v-on:click="markDone(index, element)">✔ Done</button>
          <button onclick="alert('Nicht Verfügbar')">📝 Edit</button>
          <button v-if="element.type === 'ShoppingList'" v-on:click="todoStore.deleteTodoList(element.todoID, element.type)">❌ Delete</button>
        </div>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td></td>
        <td>Quantity: {{ nTodoItems }}</td>
        <td><button v-on:click="viewTasksDone = !viewTasksDone">View Tasks already done</button></td>
      </tr>
      </tbody>
      <thead><tr><th><h1>Completed Tasks</h1></th></tr></thead>
    <tbody v-show="viewTasksDone" class="rounded">
      <tr v-for="(element, index) in completedTasks" v-bind:key="element.todoID" >
        <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
        <td class="todoItemCell">
          <ShoppingListItem v-if="element.type === 'ShoppingList'" :elem="element"/>
          <TaskItem v-if="element.type === 'Task'" :elem="element"/>
        </td>
        <td v-if="element.type === 'ShoppingList' || element.type === 'Task'">
          <div style="padding: 15px; display:grid; gap: 5px;">
          <button v-if="element.type === 'Task'" v-on:click="markUndone(index, element)">↩ Undo</button>
          <button v-on:click="todoStore.deleteTodoList(element.todoID, element.type)">❌ Delete</button>
        </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped>
tbody.rounded tr:hover {
  scale: 1.05;
  border: 1px solid black;
  background-color: hsla(160, 100%, 47%, 1);
}

tbody.rounded tr:hover td:first-child {
  border: 1px solid black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

tbody.rounded tr:hover td:last-child {
  border: 1px solid black;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

button.delete {
  font-weight: bold;
  border-radius: 20%;
  padding: 6px;
  background-color:#ff4d4d;
}

button.delete:hover {
  background-color: #d93636;
}

.todoItemCell {
  border: 1px solid black;
  background-color: aliceblue;
  padding: 10px;
  min-width: 540px;
  align-items: center;
}

button { background: #4a90e2; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; }
button:hover { background: #3b7ac0; }


  tbody{
    padding: 10px;
    background-color: burlywood;
  }

  tbody.rounded tr:first-child td:first-child {
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-top-left-radius: 20px;
  }

  tbody.rounded tr:first-child td:last-child {
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-top-right-radius: 20px;
  }

  tbody.rounded tr:last-child td:first-child {
    border-bottom: 1px solid black;
    border-bottom-left-radius: 20px;
  }

  tbody.rounded tr:last-child td:last-child {
    border-bottom: 1px solid black;
    border-bottom-right-radius: 20px;
  }
  tbody.rounded tr td:last-child {
    border-right: 1px solid black;
  }
    tbody.rounded tr td:first-child {
    border-left: 1px solid black;
  }
</style>
