export type Role = 'admin' | 'student'

export interface LoginFormValue {
    email : string;
    password : string;
}


export interface User {
    id : number;
    email : string;
    role : Role
}