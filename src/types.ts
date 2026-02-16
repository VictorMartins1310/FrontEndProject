export  interface  TodoItem {
  todoID: number,
  creationDate: Date,
  type: "Task" | "ShoppingList",
  completed: boolean,
};

export interface ShoppingListItem {
  productID: number,
  name: string,
  brand: string,
  price: number,
  qty: number,
  type: string,
  bought: boolean
};

export interface ShoppingList extends TodoItem {
  type: "ShoppingList",
  marketName: string,
  products: ShoppingListItem[]
};

export interface TaskList extends TodoItem{
  type: "Task",
  task: string,
  done: boolean
};
