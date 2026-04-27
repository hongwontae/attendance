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
  whileHover={{ scale: 1.03, y: -4 }}
  className="
    bg-gray-800
    text-gray-100
    rounded-2xl
    shadow-md
    p-5
    cursor-pointer
    transition
    border border-gray-700
    hover:bg-gray-700
    hover:border-gray-500
  "
>
  <h2 className="text-lg font-semibold mb-3 text-white">
    {data.name} (강사 - {data.instructor ?? "강사 미정"})
  </h2>

  <div className="flex flex-col text-sm text-gray-300">
    <p>
      {data.startDate ?? "시작일 미정"} ~{" "}
      {data.endDate ?? "종료일 미정"}
    </p>

    {data.description && (
      <p className="mt-2 text-gray-400 line-clamp-2">
        {data.description}
      </p>
    )}

    <div className="mt-4 text-xs text-gray-400">
      학생 수:{" "}
      <span className="text-white font-medium">
        {data.enrollmentsLength ?? 0}
      </span>
    </div>
  </div>
</motion.div>
    </>
  );
}

export default CourseCard;
