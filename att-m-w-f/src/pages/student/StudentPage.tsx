import { useQuery } from "@tanstack/react-query";
import { getStudentAPi } from "../../api/student/get-student-api";

function StudentPage(){


    const {data, isError, isLoading} = useQuery({
        queryKey : ['students'],
        queryFn : getStudentAPi
    })

    if(isError){
        return <div>Error!</div>
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    console.log(data)


    return(
        <>
            <div className="m-2 text-center">
                <h1 className="text-3xl mb-4 font-pretendard font-semibold">Student LIST</h1>
                <section className="flex flex-col gap-4 font-pretendard font-normal">
                    {data?.map(({name})=>{
                        return <div className="border rounded">{name}</div>
                    })}
                </section>
            </div>
        </>
    )
}

export default StudentPage;