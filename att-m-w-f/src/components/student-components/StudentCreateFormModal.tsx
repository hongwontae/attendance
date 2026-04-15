import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomModal from "../custom/CustomModal";
import { studentStore } from "../../store/stu-store";
import CustomButton from "../custom/CustomButton";
import CustomInput from "../custom/CustomInput";
import { useEscClose } from "../../custom-hooks/useEscClose";

type FormTypes = {
  name: string;
  age: number;
  email?: string;
  phone: string;
  pPhone?: string;
  memo?: string;
  courses: string[];
};

function StudentCreateFormModal() {
  const { register } = useForm<FormTypes>();

  const mutation = useMutation({});

  const closeModal = studentStore(stu => stu.closeModel);
  const mode = studentStore(stu => stu.mode);
  useEscClose(closeModal, mode === 'create');
  

  return (
    <>
      <CustomModal>
        <form id="student-creat-form" className="font-pretendard font-medium">
          <h1 className="mb-6 font-bold">학생 등록</h1>
          <div className="flex flex-col gap-2">
            <CustomInput register={register} inputType="text" labelName="이름" name="name"></CustomInput>
            <CustomInput register={register} inputType="number" labelName="나이" name="age"></CustomInput>
          </div>
        </form>
        <div>
            <CustomButton buttonName="Close" onClick={closeModal}></CustomButton>
        </div>
      </CustomModal>
    </>
  );
}

export default StudentCreateFormModal;
