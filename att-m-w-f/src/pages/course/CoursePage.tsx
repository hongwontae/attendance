import { useQuery } from "@tanstack/react-query";
import { getCoursesApi } from "../../api/course/get-courses-api";

function CoursePage(){

    const {data, isLoading, isError} = useQuery({
        queryFn : getCoursesApi,
        queryKey : ['courses'],

    });

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error</div>
    }
    if(!data){
        return null;
    }

    console.log(data);


    return(
        <>

        </>
    )


}

export default CoursePage;