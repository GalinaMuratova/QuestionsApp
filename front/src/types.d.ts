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


