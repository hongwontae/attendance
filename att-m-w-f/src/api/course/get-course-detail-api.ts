import type { GetCourseDetailType } from "../../types/course-type/get-course-detail-type";

export const getCourseDetailApi = async (id : number) : Promise<GetCourseDetailType>=>{
    const response = await fetch(`http://localhost:3000/course/detail/${id}`, {
        method : 'GET',
        credentials : 'include',
    })

    if(!response.ok){
        throw new Error('실패')
    }

    return await response.json()

}