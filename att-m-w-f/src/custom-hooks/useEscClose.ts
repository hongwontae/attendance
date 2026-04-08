import { useEffect } from "react";
import type { CombinedType } from "../api/student/get-student-api";

export function useEscClose(onClose: () => void, isOpen: CombinedType) {
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);
}
