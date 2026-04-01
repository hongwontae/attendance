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



    return(
        <>
            <div className="p-5 text-center">
                <h1 className="text-3xl mb-10 font-pretendard font-semibold">Student LIST</h1>
                <StudentInfo stuInfo={data}></StudentInfo>
            </div>
        </>
    )
}

export default StudentPage;