import { create } from "zustand";
import type { CombinedType } from "../api/student/get-student-api";

type ModeState = "detail" | "update" | "delete" | null;

interface StudentState {
  mode: ModeState;
  setMode: (mode: ModeState) => void;
  page: number;

  setPage: (page: number) => void;
  selectedStudent: CombinedType | null;
  setSelectedStudent: (student: CombinedType | null) => void;

  openDetail: (student: CombinedType) => void;
  openUpdate: () => void;
  openDelete: () => void;
  closeModel: () => void;
}

export const studentStore = create<StudentState>((set) => {
  return {
    mode: null,
    page: 1,
    selectedStudent: null,

    setMode: (mode: ModeState) => {
      return set({ mode });
    },
    setPage: (page: number) => {
      return set({ page });
    },
    setSelectedStudent: (selectedStudent: CombinedType | null) => {
      return set({ selectedStudent });
    },

    openDetail: (student: CombinedType) => {
      return set({ selectedStudent: student, mode: "detail" });
    },
    openUpdate: () => {
      return set({ mode: "update" });
    },
    openDelete: () => {
      return set({ mode: "delete" });
    },
    closeModel: () => {
      return set({
        selectedStudent: null,
        mode: null,
      });
    },
  };
});
