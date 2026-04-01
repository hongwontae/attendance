import { motion } from "framer-motion";
import type { CombinedType } from "../../api/student/get-student-api";

type Props = {
  closeModal: () => void;
  stuInfo: CombinedType;
};

function StudentDetailModal({ closeModal, stuInfo }: Props) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black">
        <motion.div
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Hello</h1>
          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
            onClick={closeModal}
          >
            Close
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default StudentDetailModal;
