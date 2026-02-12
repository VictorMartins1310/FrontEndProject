export  interface  TodoItem {
  todoID: number,
  creationDate: Date,
  type: string
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
  marketName: string,
  products: ShoppingListItem[]
};

export interface TaskList extends TodoItem{
  task: string,
  done: boolean
};
