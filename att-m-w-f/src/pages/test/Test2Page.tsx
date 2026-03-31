import { useState } from "react";
import { motion } from "framer-motion";

function Test2Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setOpen(!open)}>toggle</button>

        <motion.div layout='position' style={{ background: "lightblue", padding: 10 }}>
          위 박스
        </motion.div>

        {open && (
          <motion.div layout='position' style={{ background: "pink", padding: 10 }}>
            가운데 박스
          </motion.div>
        )}

        <motion.div layout='position' style={{ background: "lightgreen", padding: 10 }}>
          아래 박스
        </motion.div>
      </div>
    </>
  );
}

export default Test2Page;
