import type {StudentType} from '../../types/student-type/student-type';

type EnrollmentAllStuent = {
    id : number;
    createAt : string;
    updatedAt : string;
    student : StudentType;
    
}

export const getStudentAPi = async () : Promise<EnrollmentAllStuent[]>=>{
    const response = await fetch('http://localhost:3000/enrollment/enroll/allstu', {
        method : 'GET',
        credentials : 'include'
    })

    if(!response.ok){
        throw new Error('eerrr')
    }

    return await response.json();
}