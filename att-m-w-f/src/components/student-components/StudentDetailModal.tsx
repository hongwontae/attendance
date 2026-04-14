import type { CombinedType } from "../../api/student/get-student-api";
import { useEscClose } from "../../custom-hooks/useEscClose";
import StudentDetailInfo from "./StudentDetailInfo";
import CustomButton from "../custom/CustomButton";
import CustomModal from "../custom/CustomModal";
import { studentStore } from "../../store/stu-store";

type Props = {
  stuInfo: CombinedType;
};

function StudentDetailModal({stuInfo }: Props) {

  const closeModal = studentStore(stu=>stu.closeModel);
  const updateModal = studentStore(stu=>stu.openUpdate)


  useEscClose(closeModal, stuInfo);


  return (
    <>
      <CustomModal>

        <StudentDetailInfo stuInfo={stuInfo}></StudentDetailInfo>

        <div className="flex flex-row gap-4 mt-6 justify-center">
          <CustomButton
            buttonName="Update"
            onClick={updateModal}
          ></CustomButton>
          <CustomButton onClick={closeModal} buttonName="Close"></CustomButton>
        </div>

      </CustomModal>
    </>
  );
}

export default StudentDetailModal;
