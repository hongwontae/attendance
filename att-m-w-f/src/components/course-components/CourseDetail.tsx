import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function CourseDetail(){

    const {courseId} = useParams();

    useQuery({
        queryKey : ['course', courseId],
        enabled : !!courseId,
        
    })



    return(
        <>
            <article>
                <h1>Course-Detail</h1>
            </article>
        </>
    )
}

export default CourseDetail;