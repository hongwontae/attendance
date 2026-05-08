import type { ModeState } from "../../store/course-store";
import CustomModal from "../custom/CustomModal";

type Props = {
  setStore: (mode: ModeState) => void;
};

function CourseStudentAttendanceUpdateModal({ setStore }: Props) {
  return (
    <>
      <CustomModal>
        <div>Hello</div>
        <div onClick={() => setStore(null)}>Close</div>
      </CustomModal>
    </>
  );
}

export default CourseStudentAttendanceUpdateModal;
