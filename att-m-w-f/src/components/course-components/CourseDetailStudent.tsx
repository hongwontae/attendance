import { useQuery } from "@tanstack/react-query";
import type { MinimumStudentType } from "../../api/course/detail-get-course-stu-api";
import { detailStuApi } from "../../api/course/detail-stu-api";

type Props = {
    student : MinimumStudentType;
    courseId : number
}

function CourseDetailStudent({student, courseId} : Props){


    const {data} = useQuery({
        queryKey : ['student-detail', student.id, courseId],
        queryFn : ()=> detailStuApi(student.id, courseId)
    });

    if(!data){
        return <div>LLL</div>
    }

    console.log(data);



    return (
        <>
            <div>Hello-World</div>
            <div>{student?.name ?? "학생 없음"}</div>
        </>
    )

}

export default CourseDetailStudent;