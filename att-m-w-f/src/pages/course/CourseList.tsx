import { useQuery } from "@tanstack/react-query";
import { getCourseApi } from "../../api/course/get-course-api";
import type { GetCourseType } from "../../types/course-type/get-course-type";

function CourseList(){

    const {data, isLoading, error} = useQuery<GetCourseType[], Error>({
        queryFn : getCourseApi,
        queryKey : ['courses']
    })

    console.log(data);

    
    return(
        <>
            <h1>Course List</h1>
        </>
    )
}

export default CourseList;