import { typeMessageSnackbar } from '../../Hooks/snackBar';
import { IList } from './../../Todo/Row/row.interface';

export interface IListModal {
  active: boolean;
  changeActiveModal: () => void;
  openSnackBar: (params: typeMessageSnackbar) => void;
}

export interface IBaseModal {
  active: boolean;
  changeActiveModal: () => void;
  children: React.ReactNode;
}
export interface ITodoModal extends Omit<IListModal, 'currentList'> {
  active: boolean;
  changeActiveModal: () => void;
  currentList: IList | null;
  openSnackBar: any;
}
