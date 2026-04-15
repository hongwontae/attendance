import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomModal from "../custom/CustomModal";
import { studentStore } from "../../store/stu-store";
import CustomButton from "../custom/CustomButton";
import CustomInput from "../custom/CustomInput";
import { useEscClose } from "../../custom-hooks/useEscClose";
import CustomCheckbox from "../custom/CustomCheckbox";
import CustomTextarea from "../custom/CustomTextarea";
import { postCreateStudentApi } from "../../api/student/post-student-create-api";

export type FormTypes = {
  name: string;
  age: number;
  email?: string;
  phone: string;
  pPhone?: string;
  memo?: string;
  courses: string[];
};

function StudentCreateFormModal() {
  const { register, handleSubmit } = useForm<FormTypes>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postCreateStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      closeModal();
    },
  });

  const closeModal = studentStore((stu) => stu.closeModel);
  const mode = studentStore((stu) => stu.mode);
  useEscClose(closeModal, mode === "create");

  function onSubmit(data: FormTypes) {
    const courses = data.courses.map((id) => Number(id));
    mutation.mutate({
      ...data,
      courses,
    });
  }

  return (
    <>
      <CustomModal>
        <form
          id="student-creat-form"
          className="font-pretendard font-medium"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mb-6 font-bold">학생 등록</h1>
          <div className="flex flex-col gap-2">
            <CustomInput
              register={register}
              inputType="text"
              labelName="이름"
              name="name"
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="number"
              labelName="나이"
              name="age"
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="email"
              labelName="이메일"
              name="email"
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="text"
              labelName="학생 전화번호"
              name="phone"
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="text"
              labelName="부모님 전화번호"
              name="pPhone"
            ></CustomInput>
            <CustomCheckbox
              register={register}
              checkFieldName="과목"
              name="courses"
            ></CustomCheckbox>
            <CustomTextarea
              register={register}
              labelName="메모"
              name="memo"
            ></CustomTextarea>
          </div>
        </form>
        <div className="flex flex-row gap-4 mt-6 justify-center">
          <CustomButton
            buttonName="Create"
            type="submit"
            form="student-creat-form"
          ></CustomButton>
          <CustomButton buttonName="Close" onClick={closeModal}></CustomButton>
        </div>
      </CustomModal>
    </>
  );
}

export default StudentCreateFormModal;
