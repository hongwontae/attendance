import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchStudentApi } from "../../../api/student/get-search-student-api";

function SearchTestPage(){

    const [inputValue, setInputValue] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');

    const {data, isLoading, isError} = useQuery({
        queryKey : ['students', keyword],
        queryFn : ()=>searchStudentApi(keyword),
        enabled : !!keyword
    });

    if(isLoading){
        return <div>Loading..</div>
    }

    if(isError){
        return <div>Error...</div>
    }


    return(
        <>
            <div>
                <input className="border " type="text" onChange={(e)=>setInputValue(e.target.value)}></input>
                <button onClick={()=>setKeyword(inputValue)}>검색</button>
                <div className="felx flex-col gap-2">
                    {data?.map(({name, id})=>{
                        return <div key={id}>{name}</div>
                    })}
                </div>
            </div>
        </>
    )
}

export default SearchTestPage;