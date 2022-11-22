export interface IPorfile {
  username: string;
  password: string;
  repeatPassword?: string;
}

export interface IError {
  error: boolean;
  message: string;
}
