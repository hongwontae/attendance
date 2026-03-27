import type { LoginFormValue } from "../..//types/auth-type/auth-type"; 

export const loginApi = async (data : LoginFormValue)=>{
    
    const response = await fetch('http://localhost:3000/auth/login',{
        method : 'post',
        credentials : 'include',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    });

    if(!response.ok){
        throw new Error('로그인 실패')
    }

    return await response.json();

}