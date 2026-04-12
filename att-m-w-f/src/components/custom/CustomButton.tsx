type Props = {
  className?: string;
  onClick?: () => void;
  buttonName: string;
  form? : string
  type? : "submit" | "reset" | "button"
};

function CustomButton({ buttonName, className, onClick, form, type }: Props) {
  return (
    <>
      <button
        form={form}
        type={type}
        className={`className="mt-4 px-4 py-2 bg-gray-200 rounded-lg font-pretendard font-medium ${className}`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </>
  );
}

export default CustomButton;
