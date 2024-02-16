export interface IUser {
    firstName: string;
    lastName: string;
    middleName: string;
    birthYear: Date;
    phoneNumber: string;
    image: string;
    password: string;
    token: string;
    userLogin:string;
    statusUser: boolean;
    role: 'user' | 'admin'; 
}