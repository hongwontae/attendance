export const logoutApi = async ()=>{
    await fetch("http://localhost:3000/auth/logout", {
      method: "post",
      credentials: "include",
    });
}