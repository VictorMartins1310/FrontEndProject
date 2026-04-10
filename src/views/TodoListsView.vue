<script setup lang="ts">
import { useTodoStore } from '@/stores/todoLists'
import { computed, onMounted, reactive, ref } from 'vue';
import { type ShoppingList, type TaskList, type TodoListItem } from '@/types';
import NewList from '@/components/NewList.vue';
import TodoItem from '@/components/TodoItem.vue';
import TodosDaily from '@/components/TodosDaily.vue';
import TodoListNavigator from '@/components/TodoListNavigator.vue';

const todoStore = useTodoStore(),
  emit = defineEmits(['showNewItemForm', 'newNotification']),
  props = defineProps<{
    showNewItemForm: boolean
  }>(),

  completedTasks = reactive([] as TodoListItem[]),
  todoList = reactive([] as TodoListItem[]),
  viewTaskMode = [ "Today", "Week", "Month", "All" ],
  selected = ref("Today"),
  selectedDay = ref(new Date()),
  nTodoItems = computed(() => {
    return todoList.length;
  }),
  viewTasksDone = ref(false);



onMounted(async() => {
  //await loadItems();  
})



// async function loadToday(data: TodoListItem[]){
//   data.forEach((element: TodoListItem) => {
//     if (selectedDay.value === element.doOnDay)
//       todoList.push(element);
//   });
// }

// async function loadItems() {
//   const { data } = await todoStore.loadItems();
//   if (nTodoItems.value > 0){
//     todoList.splice(0, nTodoItems.value);
//   }
//   if (viewTaskMode[0] == selected.value)
//     loadToday(data);
//   else
//     data.forEach((element: TodoListItem) => {
//       todoList.push(element);
//     });
//   if (todoList.length > 0)
//     emit('newNotification', "Quantity of tasks", "You have " + todoList.length + " Tasks to do!");
// }

// async function getTaskList(id: number){
//   return await todoStore.getTaskList(id);
// }

// async function loadWeekItems(){
//   const { data } = await todoStore.loadItems();
//   const length = data.length;
//   for (let i = 0; i<length; i++)
//     if (data[i].type === "Task"){
//       const taskItem: TaskList = await getTaskList(data[i].todoID);
//       let doOnDay = new Date(data[i].doOnDay);
//       if (taskItem.frequency === Frequency.Daily || taskItem.frequency === Frequency.Weekly || isInWeek(selectedDay.value, doOnDay) || doOnDay.toDateString() === selectedDay.value.toDateString())
//         todoList.push(taskItem);
//     }
// }

async function markDone(index: number, task: TodoListItem) {
  await todoStore.setTaskDone(task.todoID);
  completedTasks.push(task);
  todoList.splice(index, 1);
}

async function markUndone(index: number, task: TodoListItem) {
  await todoStore.setTaskDone(task.todoID);
  todoList.push(task);
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
    todoList.push(newT);
  }else if (inputData.type === "ShoppingList") {
    const { data } = await todoStore.newShoppingList(inputData as ShoppingList);
    const newS = data; 
    todoList.push(newS);
  }
  emit('showNewItemForm', false);
}

const mode = ref(false);

function getEmitedViewTaskMode(value: string){
  selected.value = value;
}

function getEmitedDay(value: Date){
  selectedDay.value = value;
}

</script>
<template>
  <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
  <TodoListNavigator class="xy" v-on:selectedViewTaskMode="getEmitedViewTaskMode" v-on:selected-day="getEmitedDay" />
  <input type="checkbox" v-on:click="mode = !mode" />
  <div v-if="mode">
    <NewList v-if="props.showNewItemForm || todoList.length === 0" class="rounded" v-on:send-new-item="getData" />
  </div>
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
    <tbody v-if="props.showNewItemForm || todoList.length === 0" class="rounded" style="min-height: 800px;">
      <tr>
        <td><h1>0</h1></td>
        <td class="todoItemCell"><NewList v-on:send-new-item="getData"/></td>
        <td></td>
      </tr>
    </tbody>
    <TodoItem v-bind:selected-day="selectedDay" />
    <tbody v-if="!props.showNewItemForm" class="rounded">
        <!-- <tr v-for="(element, index) in todoList" v-bind:key="element.todoID" >
          <td style="text-align: center; width: min-content;"><h1>{{ index + 1 }}</h1></td>
          <td class="todoItemCell">
            <TodoItem v-bind:type="element.type" v-bind:id="element.todoID" />
          </td>
          <td v-if="element.type === 'ShoppingList' || element.type === 'Task'">
            <div style="padding: 15px; display:grid; gap: 5px;">
              <button v-if="element.type === 'Task'" v-on:click="markDone(index, element)">✔ Done</button>
              <button onclick="alert('Nicht Verfügbar')">📝 Edit</button>
              <button v-if="element.type === 'ShoppingList'" v-on:click="todoStore.deleteShoppingList(element.todoID)">❌ Delete</button>
            </div>
        </td>
      </tr> -->
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
          <TodoItem v-bind:type="todoItem.type" v-bind:id="todoItem.todoID" v-bind:selected-day="selectedDay" />
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
  <h1 v-if="selected === 'Today'">{{ selected }}</h1>
  <TodosDaily v-if="selected === 'Today'" v-bind:selected-day="selectedDay" />
  </div>
</template>

<style lang="css" src="../assets/TodoList.css">
</style>