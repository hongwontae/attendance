import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import {  useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../api/auth/logout-api";

function LogoutPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const logoutHandler = async () => {
    logoutApi();
    queryClient.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div>
        <h1>Logout</h1>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
}

export default LogoutPage;
