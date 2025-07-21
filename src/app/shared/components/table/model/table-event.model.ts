import { TableAction } from "./table-action";

export interface TableEvent<T> { 
  action: TableAction;
  data?: T
}