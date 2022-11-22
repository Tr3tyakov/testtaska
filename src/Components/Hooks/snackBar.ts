import React from 'react';

export interface typeMessageSnackbar {
  message: string;
}

interface ISnackbar {
  snackBar: IState;
  closeSnackBar: () => void;
  openSnackBar: (params: typeMessageSnackbar) => void;
}

interface IState {
  open: boolean;
  message: string;
}
export const useSnackBar = (): ISnackbar => {
  const [snackBar, setSnackBar] = React.useState<IState>({
    open: false,
    message: '',
  });

  const closeSnackBar = () => {
    setSnackBar({ ...snackBar, open: false, message: '' });
  };
  const openSnackBar = (parametrs: typeMessageSnackbar) => {
    setSnackBar({ ...snackBar, open: true, message: parametrs.message });
  };

  return { snackBar, closeSnackBar, openSnackBar };
};
