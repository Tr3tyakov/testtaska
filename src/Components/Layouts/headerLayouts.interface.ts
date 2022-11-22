import { typeMessageSnackbar } from './../Hooks/snackBar';
export interface IHeaderLayouts {
  children: React.ReactNode;
  openSnackbar: (params: typeMessageSnackbar) => void;
}
