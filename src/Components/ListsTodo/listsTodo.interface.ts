import { typeMessageSnackbar } from '../Hooks/snackBar';
import { IList } from './../Todo/Row/row.interface';

export interface IListsTodo {
  currentList: IList | null;
  lists: IList[];
  isOpenTable: boolean;
  openSnackBar: (params: typeMessageSnackbar) => void;
  changeOpenTableLists: () => void;
}
