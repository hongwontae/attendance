import type { SummaryCourseType } from "../../types/course-type/course-type";
import type { SummaryStudentType } from "../../types/student-type/student-type";

export type CombinedType = SummaryStudentType & {
    courses : SummaryCourseType[]
}


export const searchStudentApi = async (keyword : string) : Promise<CombinedType[]>=>{

    const response = await fetch(`http://localhost:3000/student/search?keword=${keyword}`, {
        credentials : 'include',
        method : 'GET'
    });

    if(!response.ok){
        throw new Error('ddd')
    }

    return await response.json();

}