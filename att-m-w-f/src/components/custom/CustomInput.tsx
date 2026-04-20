import type {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  inputType: string;
  labelName: string;
  register: UseFormRegister<T>;
  rules? : RegisterOptions<T, Path<T>>,
  onInput? : React.FormEventHandler<HTMLInputElement>
};

function CustomInput<T extends FieldValues>({
  name,
  inputType,
  labelName,
  register,
  rules,
  onInput
}: Props<T>) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center gap-2">
      <label htmlFor={name} className="">{labelName}</label>
      <input
        type={inputType}
        id={name}
        {...register(name, rules)}
        className="border rounded px-3 py-2 w-full"
        onInput={onInput}
      />
    </div>
  );
}

export default CustomInput;