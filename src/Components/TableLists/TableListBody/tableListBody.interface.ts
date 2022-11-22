import { typeMessageSnackbar } from './../../Hooks/snackBar';
import { IList } from '../../Todo/Row/row.interface';
export interface ITableBody {
  element: IList;
  currentList: IList;
  openSnackBar: (params: typeMessageSnackbar) => void;
}
