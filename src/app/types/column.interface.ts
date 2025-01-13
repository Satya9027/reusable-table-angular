export interface ColumnInterface {
  columnDef: string;
  header: Record<string, string> | string;
  cell: Function;
  isLink?: boolean;
  url?: any;
  isSortable?: boolean;
  isCheckbox?: boolean;
  isExpansion?:boolean;
  expansionColumns?:ColumnInterface[];
  expansionData?: Function;
  isDate?: boolean;
}
