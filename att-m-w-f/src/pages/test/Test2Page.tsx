import { useForm, Controller } from "react-hook-form";

const subjects = ["국어", "수학", "영어", "과학"];

function Test2Page() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="subjects"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div className="flex gap-3">
            {subjects.map((sub) => {
              const isSelected = field.value.includes(sub);

              return (
                <button
                  type="button"
                  key={sub}
                  onClick={() => {
                    if (isSelected) {
                      field.onChange(field.value.filter((v) => v !== sub));
                    } else {
                      field.onChange([...field.value, sub]);
                    }
                  }}
                  className={`px-4 py-2 border rounded
              ${isSelected ? "bg-blue-500 text-white" : ""}
            `}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}
      />

      <button type="submit">제출</button>
    </form>
  );
}

export default Test2Page;
