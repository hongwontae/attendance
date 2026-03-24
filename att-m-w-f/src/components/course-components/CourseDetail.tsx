import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getCourseDetailApi } from "../../api/course/get-course-detail-api";

function CourseDetail(){

    const {courseId} = useParams();

    const {data, isError, isLoading} = useQuery({
        queryFn : ()=>{return getCourseDetailApi(Number(courseId))},
        queryKey : ['course', courseId],
        enabled : !!courseId,
    })
    
    if(isError){
        return <div>Error</div>
    }

    if(isLoading){
        return <div>...Loading..</div>
    }

    console.log(data);



    return(
        <>
            <article>
                <h1>{data?.name}</h1>
                {data?.enrollments.map(({student})=>{
                    return <Link to={`/course/${courseId}/student/${student.id}`}>
                        {student.name} - {student.age} - {student.email}
                    </Link>
                })}
            </article>
        </>
    )
}

export default CourseDetail;