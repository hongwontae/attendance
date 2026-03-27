import type { SummaryStudentType } from "../../types/student-type/student-type";
import type { SummaryCourseType } from "../../types/course-type/course-type";

type CombinedType = SummaryStudentType & {
    courses : SummaryCourseType[]
}


export const getStudentAPi = async () : Promise<CombinedType[]>=>{
    const response = await fetch('http://localhost:3000/student/student/course', {
        method : 'GET',
        credentials : 'include'
    })

    if(!response.ok){
        throw new Error('eerrr')
    }

    return await response.json();
}