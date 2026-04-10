type Props = {
  className?: string;
  onClick: () => void;
  buttonName: string;
};

function CustomButton({ buttonName, className, onClick }: Props) {
  return (
    <>
      <button
        className={`className="mt-4 px-4 py-2 bg-gray-200 rounded-lg font-pretendard font-light ${className}`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </>
  );
}

export default CustomButton;
