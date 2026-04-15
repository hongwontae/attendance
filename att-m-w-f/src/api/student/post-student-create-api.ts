type PostCreateStudentType = {
      name: string;
  age: number;
  email?: string;
  phone: string;
  pPhone?: string;
  memo?: string;
  courses : number[];
}


export const postCreateStudentApi = async (info : PostCreateStudentType)=>{

    const response = await fetch('http://localhost:3000/student/combined/create', {
        method : 'POST',
        credentials : 'include',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(info)
    })

    if(!response.ok){
        throw new Error('hello-world')
    };

    return await response.json();



}