import { IList } from '../../../Todo/Row/row.interface';

export interface ICurrentList {
  element: IList;
  findList: string;
  changeOpenList: () => void;
  changeInputList: (param: string) => void;
  currentList: IList | null;
  clearInput: () => void;
}
