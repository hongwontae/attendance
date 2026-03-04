import { create } from "zustand";
import type { User } from "../types/login-page-types";

interface AuthState {
    user : User | null;
    authReady : boolean;
    setUser : (user : User | null)=>void;
    setAuthReady : (ready : boolean)=>void;
}

export const useAuthStore = create<AuthState>((set)=>{
    return {
        user : null,
        authReady : false,
        setUser : (user)=>{
            return set({user})
        },
        setAuthReady : (ready)=>{
            return set({authReady : ready})
        }
    }
})