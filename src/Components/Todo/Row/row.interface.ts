import { typeMessageSnackbar } from './../../Hooks/snackBar';
import { ITask } from './../../Store/Reducers/tasks/state';

export interface IRow {
  element: ITask;
  currentList: IList | null;
  openSnackBar: (params: typeMessageSnackbar) => void;
}

export interface IList {
  id: number;
  completed: boolean;
  completion_progress: number;
  name: string;
}
