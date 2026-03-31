import { useQuery } from "@tanstack/react-query";
import { getStudentAPi } from "../../api/student/get-student-api";
import StudentInfo from "../../components/student-components/StudentInfo";

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

    if(!data){
        return null;
    }

    console.log(data)


    return(
        <>
            <div className="m-2 text-center">
                <h1 className="text-3xl mb-4 font-pretendard font-semibold">Student LIST</h1>
                <StudentInfo stuInfo={data}></StudentInfo>
            </div>
        </>
    )
}

export default StudentPage;