<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists'
import { computed, onMounted, reactive, ref } from 'vue';
import { type ShoppingList, type TaskList, type TodoListItem } from '@/types';
import NewList from '@/components/NewList.vue';
import TodoItem from '@/components/TodoItem.vue';
import TodoListNavigator from '@/components/TodoListNavigator.vue';

const todoStore = useTodoStore(),
  emit = defineEmits(['showNewItemForm', 'newNotification']),
  props = defineProps<{
    showNewItemForm: boolean
  }>(),

  completedTasks = reactive([] as TodoListItem[]),
  selected = ref("All"),     /////NOT WORKING HERE
  nTodoItems = computed(() => {
    return todoStore.todoList.length;
  }),
  viewTasksDone = ref(false);


async function loadItems(){
  console.log("ONMOUNTED")
  console.log(selected.value)
  console.log(todoStore.todoList)
  console.log("ShowNewITem" + props.showNewItemForm)
  switch(selected.value){
    case "Today": await todoStore.loadTodayItems(todoStore.selectedDay); break;
    case "All": await todoStore.loadAllItems(); break;
  }  
}

onMounted(async() => {
  await loadItems();
})


async function markDone(index: number, task: TodoListItem) {
  await todoStore.setTaskDone(task.todoID);
  completedTasks.push(task);
  todoStore.todoList.splice(index, 1);
}

async function markUndone(index: number, task: TodoListItem) {
  await todoStore.setTaskDone(task.todoID);
  todoStore.todoList.push(task);
  completedTasks.splice(index, 1);
}

async function addTask(task: TaskList){
  return await todoStore.addTaskItem(task);
}

/**
 * This function get data from emited new Item
 * @param inputData 
 */
async function getData(inputData: TodoListItem) {
  if (inputData.type === "Task") {
    const newT: TaskList = await addTask(inputData as TaskList);
    todoStore.todoList.push(newT);
  }else if (inputData.type === "ShoppingList") {
    const { data } = await todoStore.newShoppingList(inputData as ShoppingList);
    const newS = data; 
    todoStore.todoList.push(newS);
  }
  emit('showNewItemForm', false);
}

function getEmitedViewTaskMode(value: string){
  selected.value = value;
}

async function getEmitedDay(value: Date){
  todoStore.selectedDay = value;
  await loadItems();
}

</script>
<template>
  <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
  <TodoListNavigator v-on:selectedViewTaskMode="getEmitedViewTaskMode" v-on:selected-day="getEmitedDay" />
  <!-- <NewList v-if="props.showNewItemForm || todoStore.todoList.length === 0" class="rounded" v-on:send-new-item="getData" /> -->
  <h1 v-if="props.showNewItemForm || todoStore.todoList.length === 0" >No Data.</h1>
  <table v-else>
    <thead>
      <tr>
        <th style="text-align: left; padding: 20px;">
          <h1>TodoLists</h1>
        </th>
        <th><!-- <button v-on:click="loadItems()">Load TodoLists</button> --></th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="!props.showNewItemForm">
        <tr v-for="(todoObject, index) in todoStore.todoList" v-bind:key="todoObject.todoID" >
          <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
          <td>
            <TodoItem v-bind:type="todoObject.type" v-bind:todoid="todoObject.todoID" />
          </td>
          <td v-if="todoObject.type === 'ShoppingList' || todoObject.type === 'Task'">
            <div style="padding: 15px; display:grid; gap: 5px;">
              <button v-if="todoObject.type === 'Task'" v-on:click="markDone(index, todoObject)">✔ Done</button>
              <button onclick="alert('Nicht Verfügbar')">📝 Edit</button>
              <button v-if="todoObject.type === 'ShoppingList'" v-on:click="todoStore.deleteShoppingList(todoObject.todoID)">❌ Delete</button>
            </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="nTodoItems > 0">
      <tr>
        <td></td>
        <td>Quantity: {{ nTodoItems }}</td>
        <td><button v-on:click="viewTasksDone = !viewTasksDone">View Tasks already done</button></td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td></td>
        <td></td>
        <td><button v-on:click="viewTasksDone = !viewTasksDone">View Tasks already done</button></td>
      </tr>
    </tbody>
    <thead><tr><th><h1>Completed Tasks</h1></th></tr></thead>
    <tbody v-show="viewTasksDone" class="rounded">
      <tr v-for="(todoItem, index) in completedTasks" v-bind:key="todoItem.todoID" >
        <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
        <td class="todoItemCell">
          <TodoItem v-bind:type="todoItem.type" v-bind:todoid="todoItem.todoID" v-bind:selected-day="todoStore.selectedDay" />
        </td>
        <td v-if="todoItem.type === 'ShoppingList' || todoItem.type === 'Task'">
          <div style="padding: 15px; display:grid; gap: 5px;">
            <button v-if="todoItem.type === 'Task'" v-on:click="markUndone(index, todoItem)">↩ Undo</button>
            <button v-on:click="todoStore.deleteTodoList(todoItem.todoID, todoItem.type)">❌ Delete</button>
        </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <table v-else>
    <thead>
      <tr>
        <th style="text-align: left; padding: 20px;">
          <h1>TodoLists</h1>
        </th>
        <th><!-- <button v-on:click="loadItems()">Load TodoLists</button></th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="props.showNewItemForm || todoStore.todoList.length === 0" class="rounded" style="min-height: 800px;">
      <tr>
        <td><h1>0</h1></td>
        <td class="todoItemCell"><NewList v-on:send-new-item="getData"/></td>
        <td></td>
      </tr>
    </tbody>
    <tbody v-if="!props.showNewItemForm" class="rounded">
        <tr v-for="(todoObject, index) in todoStore.todoList" v-bind:key="todoObject.todoID" >
          <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
          <td class="todoItemCell">
            <TodoItem v-bind:type="todoObject.type" v-bind:todoid="todoObject.todoID" />
          </td>
          <td v-if="todoObject.type === 'ShoppingList' || todoObject.type === 'Task'">
            <div style="padding: 15px; display:grid; gap: 5px;">
              <button v-if="todoObject.type === 'Task'" v-on:click="markDone(index, todoObject)">✔ Done</button>
              <button onclick="alert('Nicht Verfügbar')">📝 Edit</button>
              <button v-if="todoObject.type === 'ShoppingList'" v-on:click="todoStore.deleteShoppingList(todoObject.todoID)">❌ Delete</button>
            </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="nTodoItems > 0">
      <tr>
        <td></td>
        <td>Quantity: {{ nTodoItems }}</td>
        <td><button v-on:click="viewTasksDone = !viewTasksDone">View Tasks already done</button></td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td></td>
        <td></td>
        <td><button v-on:click="viewTasksDone = !viewTasksDone">View Tasks already done</button></td>
      </tr>
    </tbody>
    <thead><tr><th><h1>Completed Tasks</h1></th></tr></thead>
    <tbody v-show="viewTasksDone" class="rounded">
      <tr v-for="(todoItem, index) in completedTasks" v-bind:key="todoItem.todoID" >
        <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
        <td class="todoItemCell">
          <TodoItem v-bind:type="todoItem.type" v-bind:todoid="todoItem.todoID" v-bind:selected-day="todoStore.selectedDay" />
        </td>
        <td v-if="todoItem.type === 'ShoppingList' || todoItem.type === 'Task'">
          <div style="padding: 15px; display:grid; gap: 5px;">
            <button v-if="todoItem.type === 'Task'" v-on:click="markUndone(index, todoItem)">↩ Undo</button>
            <button v-on:click="todoStore.deleteTodoList(todoItem.todoID, todoItem.type)">❌ Delete</button>
        </div>
        </td>
      </tr>
    </tbody>
  </table> -->
  </div>
</template>

<!-- <style lang="css" src="../assets/TodoList.css">
</style> -->