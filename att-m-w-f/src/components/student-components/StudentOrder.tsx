import type { SetURLSearchParams } from "react-router";

type Props = {
  sort?: string;
  setSearchParams: SetURLSearchParams;
  order?: string;
};

const optionClassName = 'text-black'

function StudentOrder({ setSearchParams, order, sort }: Props) {
  return (
    <>
      <div className=" flex flex-col items-end gap-2">
        <select
          value={sort}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("sort", e.target.value);
              prev.set("page", "1");
              return prev;
            })
          }
          className="border rounded font-pretendard"
        >
          <option className={optionClassName} value="createdAt">생성일</option>
          <option className={optionClassName} value="name">이름</option>
          <option className={optionClassName} value="age">나이</option>
        </select>

        <select
          value={order}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("order", e.target.value);
              return prev;
            })
          }
          className="border rounded font-pretendard"
        >
          <option className={optionClassName} value="DESC">내림차순</option>
          <option className={optionClassName} value="ASC">오름차순</option>
        </select>
      </div>
    </>
  );
}

export default StudentOrder;
