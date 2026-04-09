import { useForm } from "react-hook-form";
import CustomInput from "../../components/custom/CustomInput";
import CustomTextarea from "../../components/custom/CustomTextarea";

const courses = ["JavaScript & React", "Java & Spring", "Excercise & Soccer"];

type FormValues = {
  name: string;
  email: string;
  courses: string[];
  phone : string;
  pPhone : string;
  memo : string;
};

function Test2Page() {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <section className="p-4 font-pretendard">
      <form
        onSubmit={handleSubmit(console.log)}
        className="border p-4 w-1/2 m-auto flex flex-col gap-2"
      >
        <div className="mb-2 font-bold">학생 정보 업데이트</div>
        <CustomInput<FormValues>
          name="name"
          inputType="text"
          labelName="이름"
          register={register}
        ></CustomInput>
        <CustomInput<FormValues>
          name="email"
          inputType="text"
          labelName="이메일"
          register={register}
        ></CustomInput>
        <CustomInput<FormValues>
          name="phone"
          labelName="휴대폰 번호"
          inputType="string"
          register={register}
          >
        </CustomInput>
        <CustomInput<FormValues>
          name="pPhone"
          inputType="string"
          labelName="부모님 번호"
          register={register}
          >
        </CustomInput>
       <CustomTextarea<FormValues>
          name="memo"
          labelName="메모"
          register={register}
        >

       </CustomTextarea>

        <div className="flex flex-row gap-2">
          <p>과목</p>
          {courses.map((course) => (
            <label key={course} className="flex items-center gap-2">
              <input type="checkbox" value={course} {...register("courses")} />
              <span>{course}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="border rounded mt-4 p-2">
          수정 제출
        </button>
      </form>
    </section>
  );
}

export default Test2Page;
