import type {
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  labelName: string;
  register: UseFormRegister<T>;
};

function CustomTextarea<T extends FieldValues>({
    name,labelName,register
} : Props<T>){

    return(
        <>
            <div className="flex flex-col gap-2 mt-2">
                <label htmlFor={name} className="text-center">{labelName}</label>
                <textarea id={name} {...register(name)} className="border rounded p-2 h-32"></textarea>
            </div>
        </>
    )
}

export default CustomTextarea;