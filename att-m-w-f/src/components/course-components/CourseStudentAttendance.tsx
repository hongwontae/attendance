import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCourseStudentAtt } from "../../api/course/get-course-stu-att-api";

function CourseStudentAttendance(){

    const {courseId, studentId} = useParams();

    useQuery({
        queryFn : ()=>{return getCourseStudentAtt(Number(courseId), Number(studentId))},
        queryKey : ['CSA', courseId, studentId],

    })

    return(
        <>

        </>
    )
}

export default CourseStudentAttendance;