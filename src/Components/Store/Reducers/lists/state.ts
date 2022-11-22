export interface IInitialState {
  lists: IList[];
  currentList: any;
}

export const initialState: IInitialState = {
  lists: [],
  currentList: null,
};

export interface IList {
  id: number;
  completed: boolean;
  completion_progress: number;
  name: string;
}
