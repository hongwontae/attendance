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
                <h1 className="text-3xl mb-4">Student LIST</h1>
                <section className="flex flex-col text-[1.2rem]">
                    {data?.map(({student, course})=>{
                        return <div>{student.name} - {course.name}</div>
                    })}
                </section>
            </div>
        </>
    )
}

export default StudentPage;