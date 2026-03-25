import type { StudentType } from "../types/student-type/student-type";

export type StudentAndCourseType = StudentType & {
    courses : {id : number, name : string, description : string}[]
}



export const getStudentAndCourse = async () : Promise<StudentAndCourseType[]>=>{
    const response = await fetch('http://localhost:3000/student/student/course',{
        method : 'GET',
        credentials : 'include'
    });

    if(!response.ok){
        throw new Error('??')
    }

    return await response.json();


}