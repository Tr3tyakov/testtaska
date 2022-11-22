interface IInitialState {
  isAuth: boolean;
  user: { username: string; id: string; is_active: boolean } | null;
}

export const initialState: IInitialState = {
  isAuth: false,
  user: null,
};
