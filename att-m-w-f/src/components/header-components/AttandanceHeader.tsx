import { Link, useNavigate } from "react-router";
import { logoutApi } from "../../api/auth/logout-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth-store";

function AttandanceHeader(){


    const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
    
    const logoutHandler = ()=>{
        logoutApi();
        queryClient.clear();
        setUser(null);
        navigate('/')
    }

    return(
        <>
            <header>
            <div className="flex flex-row justify-center gap-2">
                <Link to={'/student'}>Student</Link>
                <Link to={'/courses'}>Course</Link>
                <button onClick={logoutHandler}>Logout</button>
            </div>
            </header>
        </>
    )
}

export default AttandanceHeader;