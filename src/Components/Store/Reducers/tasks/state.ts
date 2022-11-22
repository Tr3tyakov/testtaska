interface IInitialState {
  tasks: ITask[];
}

export const initialState: IInitialState = {
  tasks: [],
};
export interface ITask {
  id: number;
  _todo_list: string;
  completed: boolean;
  name: string;
  todo_list: number;
}
