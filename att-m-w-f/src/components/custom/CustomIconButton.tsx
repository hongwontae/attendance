import { Plus } from "lucide-react";

type Props = {
    onClick? : ()=>void;
    className? : string;
}


function CustomIconButton({onClick, className} : Props) {
  return (
    <>
      <button onClick={onClick} className={className}>
        <Plus size={16}></Plus>
      </button>
    </>
  );
}

export default CustomIconButton;
