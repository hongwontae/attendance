import { motion } from "framer-motion";
import type { GetCoursesType } from "../../api/course/get-courses-api";
import CourseCard from "./CourseCard";

type Props = {
  data: GetCoursesType[];
};

function CourseCardLayout({ data }: Props) {
  return (
    <>
      <section className="p-10">
        <div className="grid grid-cols-3 gap-6">
          {data.map((ele, idx) => {
            return (
              <motion.div
                key={ele.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseCard data={ele}></CourseCard>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default CourseCardLayout;
