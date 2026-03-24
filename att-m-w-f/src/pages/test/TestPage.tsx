import { useQuery } from "@tanstack/react-query";
import { getStudentAPi } from "../../api/student/get-student-api";
import { useState } from "react";
import {motion} from 'framer-motion';

function TestPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: getStudentAPi,
  });

  if (isError) {
    return <div>KKK</div>;
  }

  if (isLoading) {
    return <div>KKK</div>;
  }

  return (
    <>
      <h1>TestPage</h1>
      <section></section>
    </>
  );
}

export default TestPage;
