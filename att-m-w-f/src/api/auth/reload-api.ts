export const reloadApi = async () => {
  const response = await fetch("http://localhost:3000/auth/profile", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("인증 실패");
  }
  return await response.json();
};
