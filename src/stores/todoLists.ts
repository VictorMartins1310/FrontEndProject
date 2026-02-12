import { API } from '@/plugins/api';
import { defineStore } from "pinia";
import { reactive } from 'vue';
import type {TodoItem, ShoppingList, ShoppingListItem, TaskList} from '@/types';

export const useTodoStore = defineStore('todoLists', () => {
  const todoListsLink : string = "/todolist";
  const taskListsLink : string = todoListsLink + "/tasklist/";
  const shoppingListsLink : string = todoListsLink + "/shoppinglist/  ";

  const todoList = reactive<TodoItem[]>([]);
  const shoppingList = reactive<ShoppingList>({} as ShoppingList);
  const taskList = reactive<TaskList>({} as TaskList);
  const shoppingItem = reactive<ShoppingListItem>({} as ShoppingListItem);

  async function getProductTypes(){
    const data = await API.getRequest("/types");
    return data;;
}

  /** Todo doc TODO REMOVE
   * @returns  All Todo Items
   */
  /*
 async function loadTodoLists(){
    const data =  await API.getRequest(todoListsLink);
    return data;
  }*/

    /**
     * Generic function to load items from a specific Todo List
     * @param type
     * @param idTodoList
     */
    async function loadItems() {
      const data = await API.getRequest(todoListsLink);
      todoList.splice(0, todoList.length); // Clear the array
      data.forEach((item: TodoItem) => {  todoList.push(item);  });
      return data;
    }

    async function getTaskList(idTodoList: number){
      return  await API.getRequest(taskListsLink + idTodoList);
    }

    async function getShoppingList(idTodoList: number){
      return  await API.getRequest(shoppingListsLink + idTodoList);
    }

    /**
     * Add new Task to TaskList
     * @param idTodoList The Id from the Todo List
     * @author Victor Martins
     */
    async function addTaskItem(newItem: TaskList){
      await API.postRequest(taskListsLink, newItem);
      todoList.push(newItem);
      newItem = {} as TaskList;;
    }
    /**
     * Todo
     * @param newTaskItem
     */
    async function newTaskList(name: string){
        const newTaskList = {
          task: name,
          type: "Task"
        }
        const data = await API.postRequest(todoListsLink + "/tasklist", newTaskList);
        console.log(data);
    }

    /**
     * Todo
     * @param newShoppingItem
     * @returns
     */
    async function newShoppingList(market: string){
      const newShoppingList = {
          marketName: market
        }
        console.log(newShoppingList);
        const data = await API.postRequest(todoListsLink + "/shoppinglist", newShoppingList);
        console.log(data);
    }
    /**
     * Todo
     * @param idTodoList
     */
    async function addShopItem(idTodoList: number, newItem: ShoppingListItem  ){
      const myLink: string = shoppingListsLink + idTodoList + "/products";
      await API.postRequest(myLink, newItem);
      return newItem;
    }

    async function deleteTodoList(id: number, type: string){
      let index: number = 0;
      let finalLink: string = shoppingListsLink;

      if (todoList.length > 1){
        if (type === "Task") finalLink = taskListsLink;

        await API.deleteRequest(finalLink + id);
          for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].todoID === id){
              index = i;
              break;
            }
          }
        todoList.splice(index, 1);
      }else alert("You cannot delete the last List");
    }

    async function setTaskDone(idTask: number){
     return  await API.patchRequest(taskListsLink  + idTask + "/done", {});
    }

    return {
        todoList, shoppingList, taskList, shoppingItem,
        loadItems, addShopItem, newShoppingList, newTaskList, deleteTodoList, getTaskList, getShoppingList, setTaskDone, addTaskItem, getProductTypes
      }
});
