export interface IAuthor {
  _id: string;
  firstName: string;
}

export interface IAnswer {
  _id: string;
  author: IAuthor;
  date: string;
  title: string;
}

export interface IQuestion {
  _id: string;
  author: IAuthor;
  date: string;
  title: string;
  hidden: boolean;
  answers: IAnswer[];
}

export interface RegisterMutation {
  firstName: string;
  lastName: string;
  middleName: string;
  birthYear: string;
  phoneNumber: string;
  image: string | null;
  password: string;
  passwordConfirm:string;
  userLogin:string;
}

export interface RegisterAdminMutation {
  firstName: string;
  lastName: string;
  middleName: string;
  birthYear: string;
  phoneNumber: string;
  image: string | null;
  userLogin:string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface LoginMutation {
  userLogin: string;
  password: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthYear: Date;
  phoneNumber: string;
  image: string;
  token: string;
  userLogin:string;
  statusUser: boolean;
  role: 'user' | 'admin';
}

export interface IUserMutation {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthYear: Date;
  phoneNumber: string;
  image: File | null;
  userLogin:string;
}

export interface ILogin{
  exists: boolean;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}


