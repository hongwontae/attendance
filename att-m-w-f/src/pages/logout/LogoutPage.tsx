import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import { QueryClient } from "@tanstack/react-query";

function LogoutPage() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const logoutHandler = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "post",
      credentials: "include",
    });
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
