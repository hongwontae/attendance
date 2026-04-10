import type { CombinedType } from "../../api/student/get-student-api";
import CustomModal from "../custom/CustomModal";
import { useEscClose } from "../../custom-hooks/useEscClose";
import { useForm } from "react-hook-form";
import CustomButton from "../custom/CustomButton";
import CustomInput from "../custom/CustomInput";

type Props = {
  stuInfo: CombinedType;
  closeModal: () => void;
};

function StudentUpdateFormModal({ stuInfo, closeModal }: Props) {
  const { register } = useForm({
    defaultValues: {
      name: stuInfo.name,
      age: stuInfo.age,
      email: stuInfo.email,
      phone: stuInfo.phone,
      pPhone: stuInfo.pPhone,
      memo: stuInfo.memo,
    },
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  useEscClose(closeModal, stuInfo);

  return (
    <>
      <CustomModal>
        <form className="font-pretendard">
          <h1 className="mb-2 font-bold">학생 정보 업데이트</h1>
          <CustomInput register={register} labelName="이름" inputType="text" name="name"></CustomInput>
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
