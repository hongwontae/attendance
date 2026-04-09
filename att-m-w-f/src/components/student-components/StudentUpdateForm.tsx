import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { CombinedType } from "../../api/student/get-student-api";

type Props = {
    stuInfo : CombinedType
}

function StudentUpdateForm({stuInfo} : Props) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(()=>{
    if(stuInfo){
        reset(stuInfo)
    }2
  }, [reset, stuInfo])

  return (
    <>
      <form>
        <div>
          <label></label>
          <input {...register("name")} ></input>
        </div>
        <div>
          <label></label>
          <input {...register("age")} type="number"></input>
        </div>
        <div>
          <label {...register("")}></label>
          <input></input>
        </div>
        <div>
          <label></label>
          <input></input>
        </div>
      </form>
    </>
  );
}

export default StudentUpdateForm;
