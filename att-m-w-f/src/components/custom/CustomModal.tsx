import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

function CustomModal({ children }: Props) {
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
          {children}
        </motion.div>
      </div>
    </>
  );
}

export default CustomModal;
