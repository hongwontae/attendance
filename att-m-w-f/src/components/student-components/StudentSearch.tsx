import type { SetURLSearchParams } from "react-router";

type Props = {
  nameInput: string;
  setNameInput: (v: string) => void; // ✅ 수정

  phone: string;
  course: string;

  setSearchParams: SetURLSearchParams;
};

function StudentSearch({
  course,
  nameInput,
  phone,
  setNameInput,
  setSearchParams,
}: Props) {
  return (
    <div className="flex gap-2 mb-5 justify-center font-pretendard">
      {/* 이름 */}
      <input
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="이름"
        className="border p-2 rounded"
      />

      {/* 전화번호 */}
      <input
        value={phone}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("page", "1");
            prev.set("phone", e.target.value);
            return prev;
          })
        }
        placeholder="전화번호"
        className="border p-2 rounded"
        
      />

      {/* 과목 */}
      <select
        value={course}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("page", "1");
            prev.set("course", e.target.value);
            return prev;
          })
        }
        className="border p-2 rounded "
      >
        <option className="text-black" value="">과목</option>
        <option className="text-black" value="React">JavaScript & React</option>
        <option className="text-black" value="Spring">Java & Spring</option>
        <option className="text-black" value="Excercise">Excercise</option>
      </select>
    </div>
  );
}

export default StudentSearch;