import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {motion} from 'framer-motion';
import { getStudentAndCourse } from "../../api/get-student-course.api";

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
      <h1>TestPage</h1>
      <div className="p-2">
        {data?.map(({id,name, email, phone, courses})=>{
          const isOpen = openId === id;
          return <motion.div 
          key={id}
          layout
          className="border rounded-xl mb-4 cursor-pointer"
          onClick={()=>handleClick(id)}
          >
            <div>
              <h3>{name}</h3>
              <p>{email}</p>
            </div>
            {isOpen && (
              <motion.div layout className="mt-4">
                <p>전화번호 : {phone}</p>
                {courses.map(({id, name, description})=>{
                  return <div key={id}>과정 : {name} 설명 : {description}</div>
                })}
              </motion.div>
            )}
          </motion.div>
        })}
      </div>
    </>
  );
}

export default TestPage;
