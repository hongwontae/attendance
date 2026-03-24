import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { LoginFormValue } from "../../types/login-page-types";
import { loginApi } from "../../api/auth-api";
import { useAuthStore } from "../../store/auth-store";
import { useNavigate } from "react-router";

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValue>();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data);
      navigate("/student");
    },
    onError: () => {
      alert("로그인 실패");
    },
  });

  const onSubmit = (data: LoginFormValue) => {
    mutation.mutate(data)
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="border p-2 rounded-2xl"
          ></input>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="border p-2 rounded-2xl"
          ></input>
          <button type="submit" className="border" disabled={mutation.isPending}>
            {mutation.isPending ? '로그인 중..' : '로그인'}
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
