

export const getDetailCourseApi = async (courseId : number)=>{
    
    const response = await fetch('http://localhost:3000/course', {
        method : 'GET',
        credentials : 'include'
    });

    if(!response.ok){
        throw new Error('데이터 페칭 실패');
    }

    return await response.json();


}   