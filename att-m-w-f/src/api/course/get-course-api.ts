import type { GetCourseType } from "../../types/course-type/get-course-type";

export const getCourseApi = async () : Promise<GetCourseType[]>=>{
    const response = await fetch('http://localhost:3000/course/all', {
        method : 'GET',
        credentials : 'include'
    });

    if(!response.ok){
        throw new Error('course fetch fail')
    }

    return await response.json();

}