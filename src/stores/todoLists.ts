import { API } from '@/plugins/api';
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Frequency, type ShoppingList, type ShoppingListItem, type TaskList, type TodoListItem} from '@/types';
import { isSameDate } from '@/plugins/dates';

export const useTodoStore = defineStore('todoLists', () => {
  const todoListsLink : string = "/todolist",
    taskListsLink : string = todoListsLink + "/tasklist",
    shoppingListsLink : string = todoListsLink + "/shoppinglist",

    todoList = reactive<TodoListItem[]>([]),


    //Check if follow makes sense to develop

    getItemsAll: number = 2,
    getItemsCompleted: number = 0,
    getItemsUncomplete: number = 1,

    
    selectedDay = ref(new Date());

  async function getProductTypes(){
    return await API.getRequest("/types");
  }

  /**
     * Generic function to load items from a specific Todo List
     * @param type
     * @param idTodoList
     */
  async function loadItems() {
    const length = todoList.length;
    todoList.splice(0, length)
    const { response, data } = await API.getRequest(todoListsLink + "?completed=2");
    return { data };
  }

  async function loadAllItems(){
    const { data } = await loadItems();
    const length = data.length;
    for (let i = 0; i<length; i++){
      todoList.push(data[i]);
    }
  }

  async function loadTodayItems(selectedDay: Date) {
    const { data } = await loadItems();
    const length = data.length;
    for (let i = 0; i<length; i++){
      let doOnDay = new Date(data[i].doOnDay);
      let todoItem;
      if (data[i].type === "Task"){
        todoItem = await getTaskList(data[i].todoID);
        if (todoItem.frequency === Frequency.Daily || isSameDate(doOnDay, selectedDay)){
          todoList.push(todoItem);
        }
      }
      else if (data[i].type === "ShoppingList"){
        /* TODO to be correct */
        if (doOnDay.toDateString() === selectedDay.toDateString())
          todoList.push(data[i]);
      }
    }
  }

  async function loadWeekItems(){
    const { data } = await loadItems();
  }

  async function loadMonthItems(){
    const { data } = await loadItems();
  }

  async function getTaskList(idTodoList: number){
    const { response, data } = await API.getRequest(taskListsLink + "/" + idTodoList);
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
    }
    else alert("You cannot delete the last List");
  }

  async function deleteShoppingList(id: number,){
    const result = await API.deleteRequest(shoppingListsLink + "/" + id);
    console.log("DELETE: ", result);
  }

  async function setTaskDone(idTask: number){
    return await API.patchRequest(taskListsLink  + "/" + idTask + "/done", {});
  }

  return {
    todoList, selectedDay, loadItems, loadTodayItems, loadAllItems,
    newShoppingList, deleteShoppingList,deleteTodoList, getTaskList, getShoppingList, setTaskDone, addTaskItem, getProductTypes, addShopItem
  }
});
