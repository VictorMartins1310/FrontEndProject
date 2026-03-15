export enum Frequency {
    Once = "Once",
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly"
}

export enum ProductType {
    Other = "Other",        Drink = "Drink",
    Hygienic = "Hygienic",  Alcohol = "Alcohol",
    Fish = "Fish",          Ham = "Ham",
    Fruit = "Fruit",        Vegetables = "Vegetables"
};

export  interface  TodoItem {
  todoID: number,
  creationDate: Date,
  doOnDay: Date,
  completed: boolean,
};

export interface ShoppingListItem {
  productID: number,
  name: string,
  brand: string,
  price: number,
  qty: number,
  type: ProductType,
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
  frequency: Frequency
};

  export type TodoListItem =  ShoppingList | TaskList;
