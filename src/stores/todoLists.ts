import { API } from '@/plugins/api';
import { defineStore } from "pinia";
import { tokenToString } from 'typescript';
import { reactive } from 'vue';

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

    let todoLists = reactive<TodoList[]>([]);

    let shoppingListItems = reactive<ShoppingListItem[]>([]);
    let shoppingList = reactive<ShoppingList>(
        {
            todoListID: 0,
            todoListName: "",
            creationDate: new Date,
            active: false,
            marketName: "",
            products: []
        }
    );

    let taskListItems = reactive<TaskListItem[]>([]);
    let taskList = reactive<TaskList>(
        {
            todoListID: 0,
            todoListName: "",
            creationDate: new Date,
            active: false,
            tasks: []
        }
    );

const shoppingItem = reactive<ShoppingListItem>({
  name: "",
  brand: "",
  price: 0.01,
  qty: 1,
  type: ""
});

const taskItem = reactive<TaskListItem>({
  task: "",
  done: false
});

    /**
     * Todo
     */
    async function loadTodoLists(){
        const data: TodoList[] = await API.getRequest(todoListsLink);
        if (todoLists.length > 0 ) todoLists.splice(0, todoLists.length); // Clear the array
        if (data.length > 0) data.forEach((element: TodoList) => {
            todoLists.push(element);
        });
    }

    /**
     * Todo
     * @param idTodoList
     */
    async function loadShopItems(idTodoList: number) {
        shoppingList = await API.getRequest(shoppingListsLink + idTodoList);
        shoppingListItems = shoppingList.products
    }

    /**
     * Todo
     * @param idTodoList
     */
    async function loadTaskItems(idTodoList: number) {
        taskList = await API.getRequest(taskListsLink + idTodoList);
        taskListItems = taskList.tasks;
    }

    /**
     * Todo
     * @param newTaskItem
     */
    async function newTaskList(name: string){
        const newTaskList = {
          todoListName: name
        }
        const data = await API.postRequest(todoListsLink + "/tasklist", newTaskList);
        console.log(data);
        todoLists.push(data);
    }

    /**
     * Todo
     * @param newShoppingItem
     * @returns
     */
    async function newShoppingList(){
        alert("Function need to be Develop: ");
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
        brand: shoppingItem.brand,
        name : shoppingItem.name,
        price: shoppingItem.price,
        qty: shoppingItem.qty,
        type: shoppingItem.type
      }
      await API.postRequest(myLink, newItem);
      shoppingListItems.push(newItem);
      shoppingItem.brand = "";
      shoppingItem.name = "";
      shoppingItem.qty = 1;
    }

    /**
     * Add new Task to TaskList
     * @param idTodoList The Id from the Todo List
     * @author Victor Martins
     */
    async function addTaskItem(idTodoList: number){
      const newItem: TaskListItem = {
        task:   taskItem.task,
        done: taskItem.done
      }
      await API.postRequest(taskListsLink + idTodoList, newItem);
      taskListItems.push(newItem);
      taskItem.task = "";
      taskItem.done = false;
    }

    async function deleteTodoList(id: number, type: string){
      console.log("TYPE : " + type);
      console.log("ID : " + id);
      let index: number = 0;
      if (type === "shoppinglist"){
        await API.deleteRequest(shoppingListsLink + id);
        for (let i = 0; i < todoLists.length; i++) {
          if (todoLists[i].todoListID === id){
            index = i;
            break;
          }
        }
      } else if (type === "tasklist"){
        await API.deleteRequest(taskListsLink + id);
        for (let i = 0; i < todoLists.length; i++) {
          if (todoLists[i].todoListID === id){
            index = i;
            break;
          }
        }
      }
      todoLists.splice(index, 1);
    }

    return {
        todoLists, shoppingList, taskList, shoppingListItems, taskListItems, shoppingItem, taskItem,
        loadShopItems, loadTodoLists, loadTaskItems, addShopItem, addTaskItem, newShoppingList, newTaskList, deleteTodoList
    };
});
