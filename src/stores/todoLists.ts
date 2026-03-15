import { API } from '@/plugins/api';
import { defineStore } from "pinia";
import { reactive } from 'vue';
import type { ShoppingList, ShoppingListItem, TaskList, TodoListItem} from '@/types';

export const useTodoStore = defineStore('todoLists', () => {
  const todoListsLink : string = "/todolist";
  const taskListsLink : string = todoListsLink + "/tasklist";
  const shoppingListsLink : string = todoListsLink + "/shoppinglist";

  const todoList = reactive<TodoListItem[]>([]);

  async function getProductTypes(){
    return await API.getRequest("/types");
  }

  /**
     * Generic function to load items from a specific Todo List
     * @param type
     * @param idTodoList
     */
  async function loadItems() {
    //return await API.getRequest(todoListsLink);
    const { response, data } = await API.getRequest(todoListsLink + "?completed=1");
    return { data };
  }

  async function getTaskList(idTodoList: number){
    const { response, data } = await API.getRequest(taskListsLink + "/" + idTodoList);
    console.log(response.status + " - " + response.statusText);
    return data;
  }

  async function getShoppingList(idTodoList: number){
    const { response, data } = await API.getRequest(shoppingListsLink + "/" +  idTodoList);
    return data;
  }

    /**
     * Add new Task to TaskList
     * @param idTodoList The Id from the Todo List
     * @author Victor Martins
     */
  async function addTaskItem(newItem: TaskList){
    const { response, data } = await API.postRequest(taskListsLink, newItem);
    return data;
  }

    /**
     * Todo
     * @param newShoppingItem
     * @returns
     */
    async function newShoppingList(newItem: ShoppingList){
      const newShoppingList = {
          marketName: newItem.marketName,
        }
        return await API.postRequest(shoppingListsLink, newShoppingList);
    }

    /**
     * Todo
     * @param idTodoList
     */
    async function addShopItem(idTodoList: number, newItem: ShoppingListItem  ){
      const myLink: string = shoppingListsLink + "/" + idTodoList + "/products";
      await API.postRequest(myLink, newItem);
      return newItem;
    }

    // TODO: DELETE This function
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

    async function deleteShoppingList(id: number,){
      const result = await API.deleteRequest(shoppingListsLink + "/" + id);
      console.log(result);
    }

    async function setTaskDone(idTask: number){
     return  await API.patchRequest(taskListsLink  + "/" + idTask + "/done", {});
    }

    return {
        todoList,
        loadItems, newShoppingList, deleteShoppingList,deleteTodoList, getTaskList, getShoppingList, setTaskDone, addTaskItem, getProductTypes, addShopItem
      }
});
