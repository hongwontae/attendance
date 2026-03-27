import { create } from "zustand";
import type { User } from "../types/auth-type/auth-type";

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