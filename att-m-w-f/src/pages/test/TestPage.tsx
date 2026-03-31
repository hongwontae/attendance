import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getStudentAndCourse } from "../../api/student/get-student-course.api";

function TestPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: getStudentAndCourse,
  });

  if (isError) {
    return <div>KKK</div>;
  }

  if (isLoading) {
    return <div>KKK</div>;
  }

  console.log(data);

  return (
    <>
      <section className="p-2 font-pretendard font-medium">
        <h1 className="font-pretendard font-semibold text-[1.5rem] text-center">
          TestPage
        </h1>
        <div className="p-2">
          {data?.map(({ id, name, email, phone, courses }) => {
            const isOpen = openId === id;
            return (
              <motion.div
                layout
                key={id}
                className="border rounded-xl mb-4 cursor-pointer p-1"
                onClick={() => handleClick(id)}
              >
                <div>
                  <h3>{name}</h3>
                  <p>{email}</p>
                </div>
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                    layout="position"
                      className="mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <p>전화번호 : {phone}</p>
                      {courses.map(({ id, name, description }) => {
                        return (
                          <div key={id}>
                            과정 : {name} 설명 : {description}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default TestPage;
