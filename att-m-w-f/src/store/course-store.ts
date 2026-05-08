import { create } from "zustand";

export type ModeState = "att" | "update" | "delete" |"create"| null;


interface CourseState {
    mode : ModeState;
    setMode : (mode : ModeState)=> void;
}

export const courseStore = create<CourseState>((set)=>{
    return {
        mode : null,
        setMode : (mode : ModeState)=>{
            return set({mode})
        }
    }
})