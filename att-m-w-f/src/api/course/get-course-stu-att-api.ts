export const getCourseStudentAtt = async (courseId : number, studentId : number)=>{
    const response = await fetch('http://localhost:3000/....', {
        method : 'GET',
        credentials : 'include'
    })

    if(!response.ok){
        throw new Error('실패')
    }

    return await response.json();
}