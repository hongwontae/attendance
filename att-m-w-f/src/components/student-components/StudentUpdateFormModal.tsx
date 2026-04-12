import type { CombinedType } from "../../api/student/get-student-api";
import CustomModal from "../custom/CustomModal";
import { useEscClose } from "../../custom-hooks/useEscClose";
import { useForm } from "react-hook-form";
import CustomButton from "../custom/CustomButton";
import CustomInput from "../custom/CustomInput";
import CustomTextarea from "../custom/CustomTextarea";
import CustomCheckbox from "../custom/CustomCheckbox";

type Props = {
  stuInfo: CombinedType;
  closeModal: () => void;
};

type FormValues = {
  name: string;
  age: number;
  email: string;
  phone: string;
  pPhone: string;
  memo: string;
  courses: string[];
};

function StudentUpdateFormModal({ stuInfo, closeModal }: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: stuInfo.name,
      age: stuInfo.age,
      email: stuInfo.email,
      phone: stuInfo.phone,
      pPhone: stuInfo.pPhone,
      memo: stuInfo.memo,
      courses: stuInfo.courses.map((c) => c.name),
    },
  });

  function onSubmit(data: any) {
    console.log("??");
    console.log(data);
  }

  useEscClose(closeModal, stuInfo);

  return (
    <>
      <CustomModal>
        <form
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
            ></CustomInput>
            <CustomInput
              register={register}
              labelName="나이"
              inputType="number"
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
              courses={stuInfo.courses.map((c) => c.name)}
            ></CustomCheckbox>
            <CustomTextarea
              register={register}
              labelName="메모"
              name="memo"
            ></CustomTextarea>
          </div>
          <button type="submit">mmmm</button>
        </form>

        <div className="flex flex-row gap-4 mt-6 justify-center">
          <CustomButton
            buttonName="Submit"
            onClick={() => console.log("update success")}
          ></CustomButton>
          <CustomButton buttonName="Close" onClick={closeModal}></CustomButton>
        </div>
      </CustomModal>
    </>
  );
}

export default StudentUpdateFormModal;
