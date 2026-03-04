import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth-store";
import { useEffect } from "react";
import { reloadApi } from "../api/reload-api"; 

function AppInitComponent(){

    const setUser = useAuthStore((state)=>state.setUser);
    const setAuthReady = useAuthStore((state)=>state.setAuthReady);

    const {data, isError, isSuccess} = useQuery({
        queryKey : ['me'],
        queryFn : reloadApi,
        retry : false,
    })

    useEffect(()=>{
        if(isSuccess){
            setUser(data)
            setAuthReady(true)
        }

        if(isError){
            setUser(null)
            setAuthReady(true)
        }
    },[isSuccess, isError])


    return null;

}

export default AppInitComponent;