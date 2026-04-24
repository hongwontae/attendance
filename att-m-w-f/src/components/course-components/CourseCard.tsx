import { motion } from "framer-motion";
import type { GetCoursesType } from "../../api/course/get-courses-api";
import { useNavigate } from "react-router";

type Props = {
  data: GetCoursesType;
};

function CourseCard({ data }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/detail/${data.id}`);
  };

  return (
    <>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-2xl shadow-md p-5 cursor-pointer text-black font-pretendard text-center"
      >
        <h2 className="text-lg font-bold">{data.name}</h2>
        <p className="mt-2">{data.description}</p>

        <div className="mt-4 text-sm">
          학생 수: {data.enrollmentsLength ?? 0}
        </div>
      </motion.div>
    </>
  );
}

export default CourseCard;
