import { typeMessageSnackbar } from './../Hooks/snackBar';
import { IList } from '../Todo/Row/row.interface';
export interface ITableLists {
  list: IList[];
  currentList: IList;
  openSnackBar: (params: typeMessageSnackbar) => void;
}
