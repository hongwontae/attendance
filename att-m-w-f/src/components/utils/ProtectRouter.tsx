import { Navigate } from "react-router";
import { useAuthStore } from "../../store/auth-store";

type Props = {
  children: React.ReactNode;
};

function ProtectRouter({ children }: Props) {
  const user = useAuthStore((state) => state.user);
  const authReady = useAuthStore((state) => state.authReady);


    if(!authReady){
        return <div>Loading..</div>
    }

    if(!user){
        return <Navigate to={'/'} replace></Navigate>
    }

    return <>{children}</>

}

export default ProtectRouter;
