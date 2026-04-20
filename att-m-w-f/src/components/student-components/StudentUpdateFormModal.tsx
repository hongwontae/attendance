import type { CombinedType } from "../../api/student/get-student-api";
import CustomModal from "../custom/CustomModal";
import { useEscClose } from "../../custom-hooks/useEscClose";
import { useForm } from "react-hook-form";
import CustomButton from "../custom/CustomButton";
import CustomInput from "../custom/CustomInput";
import CustomTextarea from "../custom/CustomTextarea";
import CustomCheckbox from "../custom/CustomCheckbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentApi } from "../../api/student/post-student-update-api";
import { studentStore } from "../../store/stu-store";
import { ageRefine, emailRefine, nameRefine, phoneRefine } from "../../util-function/stu-func/stu-page-func";

type Props = {
  stuInfo: CombinedType;
};

export type FormValues = {
  name: string;
  age: number;
  email: string;
  phone: string;
  pPhone: string;
  memo: string;
  courses: string[];
};


function StudentUpdateFormModal({ stuInfo }: Props) {


  const closeModal = studentStore(stu=>stu.closeModel);
  const deleteModal = studentStore(stu=>stu.openDelete)
  const mode = studentStore(stu => stu.mode)


  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn : updateStudentApi,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey : ['students']});
      closeModal();
    }

  })

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: stuInfo.name,
      age: stuInfo.age,
      email: stuInfo.email,
      phone: stuInfo.phone,
      pPhone: stuInfo.pPhone,
      memo: stuInfo.memo,
      courses: stuInfo.courses.map((c) => String(c.id)),
    },
  });

  function onSubmit(data: FormValues) {
    const courseIds = data.courses.map(id => Number(id))
    console.log(data)
  mutation.mutate({
    ...data,
    courseIds : courseIds,
    id: stuInfo.id,
  });
}

  useEscClose(closeModal, mode==='update');

  return (
    <>
      <CustomModal>
        <form
        id="student-form"
          className="font-pretendard font-medium"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mb-6 font-bold">학생 정보 업데이트</h1>
          <div className="flex flex-col gap-2">
            <CustomInput
              register={register}
              labelName="이름"
              inputType="text"
              name="name"
              onInput={(e)=>nameRefine(e)}
            ></CustomInput>
            <CustomInput
              register={register}
              labelName="나이"
              inputType="text"
              name="age"
              onInput={(e)=>ageRefine(e)}
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="email"
              labelName="이메일"
              name="email"
              onInput={(e)=>emailRefine(e)}
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="text"
              labelName="학생 전화번호"
              name="phone"
              onInput={(e)=>phoneRefine(e)}
            ></CustomInput>
            <CustomInput
              register={register}
              inputType="text"
              labelName="부모님 전화번호"
              name="pPhone"
              onInput={(e)=>phoneRefine(e)}
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
            form='student-form'
            buttonName="Submit"
            type='submit'
          ></CustomButton>
          <CustomButton buttonName="Reset" onClick={()=>reset()}></CustomButton>
          <CustomButton buttonName="Delete" onClick={deleteModal}></CustomButton>
          <CustomButton buttonName="Close" onClick={closeModal}></CustomButton>
        </div>
      </CustomModal>
    </>
  );
}

export default StudentUpdateFormModal;
