import { API } from '@/plugins/api';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTodoStore = defineStore('todoLists', () => {
    const todoListsLink : string = "/todolist";
    const taskListsLink : string = todoListsLink + "/tasklist/";
    const shoppingListsLink : string = todoListsLink + "/shoppinglist/  ";

    type TodoList = {
        todoListID: number,
        todoListName: string,
        creationDate: Date,
        active: boolean,
        type: string
    };

    type ShoppingListItem = {
        name: string,
        brand: string,
        price: number,
        qty: number,
        type: string
    };

    type ShoppingList = {
        todoListID: number,
        todoListName: string,
        creationDate: Date,
        active: boolean,
        marketName: string,
        products: ShoppingListItem[]
    };

    type TaskListItem = {
        task: string,
        done: boolean
    };

    type TaskList = {
        todoListID: number,
        todoListName: string,
        creationDate: Date,
        active: boolean,
        tasks: TaskListItem[]
    };

    const todoLists = ref<TodoList[]>([]);

    const shoppingListItems = ref<ShoppingListItem[]>([]);
    const shoppingList = ref<ShoppingList>(
        {
            todoListID: 0,
            todoListName: "",
            creationDate: new Date,
            active: false,
            marketName: "",
            products: []
        }
    );

    const taskListItems = ref<TaskListItem[]>([]);
    const taskList = ref<TaskList>(
        {
            todoListID: 0,
            todoListName: "",
            creationDate: new Date,
            active: false,
            tasks: []
        }
    );

const shoppingItem = ref<ShoppingListItem>({
  name: "",
  brand: "",
  price: 0.01,
  qty: 1,
  type: ""
});

const taskItem = ref<TaskListItem>({
  task: "",
  done: false
});

    /**
     * Todo
     */
    async function loadTodoLists(){
        todoLists.value = await API.getRequest(todoListsLink);
    }

    /**
     * Todo
     * @param idTodoList
     */
    async function loadShopItems(idTodoList: number) {
        shoppingList.value = await API.getRequest(shoppingListsLink + idTodoList);
        shoppingListItems.value = shoppingList.value.products
    }

    /**
     * Todo
     * @param idTodoList
     */
    async function loadTaskItems(idTodoList: number) {
        taskList.value = await API.getRequest(taskListsLink + idTodoList);
        taskListItems.value = taskList.value.tasks;
    }

    /**
     * Todo
     * @param newTaskItem
     */
    async function newTaskList(newTaskItem: TaskListItem){
        alert("Function need to be Develop: " + newTaskItem);
        return null;
    }

    /**
     * Todo
     * @param newShoppingItem
     * @returns
     */
    async function newShoppingList(newShoppingItem: ShoppingListItem){
        alert("Function need to be Develop: " + newShoppingItem);
        return null;
    }
    /**
     * Todo
     * @param idTodoList
     * @param newShoppingItem
     */



    async function addShopItem(idTodoList: number){
      const myLink: string = shoppingListsLink + idTodoList + "/products";
      const newItem: ShoppingListItem = {
        brand: shoppingItem.value.brand,
        name : shoppingItem.value.name,
        price: shoppingItem.value.price,
        qty: shoppingItem.value.qty,
        type: shoppingItem.value.type
      }
      await API.postRequest(myLink, newItem);
      shoppingListItems.value.push(newItem);
      shoppingItem.value.brand = "";
      shoppingItem.value.name = "";
      shoppingItem.value.qty = 1;
    }

    /**
     * Add new Task to TaskList
     * @param idTodoList The Id from the Todo List
     * @author Victor Martins
     */
    async function addTaskItem(idTodoList: number){
      const newItem: TaskListItem = {
        task:   taskItem.value.task,
        done: taskItem.value.done
      }
      await API.postRequest(taskListsLink + idTodoList, newItem);
      taskListItems.value.push(newItem);
      taskItem.value.task = "";
      taskItem.value.done = false;
    }

    return {
        todoLists, shoppingList, taskList, shoppingListItems, taskListItems, shoppingItem, taskItem,
        loadShopItems, loadTodoLists, loadTaskItems, addShopItem, addTaskItem, newShoppingList, newTaskList
    };
});
