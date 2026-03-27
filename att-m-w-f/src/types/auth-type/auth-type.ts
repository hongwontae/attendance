export type Role = 'admin' | 'student'


export interface User {
    id : number;
    email : string;
    role : Role
}


export interface LoginFormValue {
    email : string;
    password : string;
}


export interface AuthState {
    user : User | null;
    authReady : boolean;
    setUser : (user : User | null)=>void;
    setAuthReady : (ready : boolean)=>void;
}




