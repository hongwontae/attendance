import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStudentAPi } from "../../../api/student/get-student-api";

function TestPaging(){

    const [page, setPage] = useState<number>(1);

    const {data, isError, isLoading} = useQuery({
        queryKey : ['test-page', page],
        queryFn : ()=> getStudentAPi(page)
    })

    if(isError){
        return <div>Error!</div>
    }
    if(isLoading){
        return <div>Loading..</div>
    }
    if(!data){
        return <div>Data comming soon...</div>
    }


    return(
        <>
            
        </>
    )
}

export default TestPaging;