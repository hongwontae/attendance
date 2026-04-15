import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CombinedType } from "../../api/student/get-student-api";
import { useEscClose } from "../../custom-hooks/useEscClose";
import CustomButton from "../custom/CustomButton";
import CustomModal from "../custom/CustomModal";
import { deleteStudentApi } from "../../api/student/delete-student-api";
import { studentStore } from "../../store/stu-store";

type Props = {
  stuInfo: CombinedType;
};

function StudentDeleteModal({ stuInfo }: Props) {

  const closeModal = studentStore(stu => stu.closeModel);
  const mode = studentStore(stu => stu.mode);

  useEscClose(closeModal, mode === 'delete');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      closeModal();
    },
  });

  function deleteHandler(id: number) {
    mutation.mutate(id);
  }

  return (
    <>
      <CustomModal>
        <div className="font-pretendard font-medium flex flex-col gap-2">
          <h1 className="mb-4 font-bold">해당 학생을 정말 삭제하시겠습니까?</h1>
          <p>이름 : {stuInfo.name}</p>
          <p>메모 : {stuInfo.memo}</p>
          <div className="flex flex-row justify-center gap-4 mt-2">
            <CustomButton
              onClick={() => deleteHandler(stuInfo.id)}
              buttonName="Delete"
            ></CustomButton>
            <CustomButton
              onClick={closeModal}
              buttonName="Close"
            ></CustomButton>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default StudentDeleteModal;
