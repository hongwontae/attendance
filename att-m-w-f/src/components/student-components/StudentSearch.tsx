import { useState } from "react";

type Props = {
    onSearch : (keyword : string)=>void;
}

function StudentSearch({onSearch} : Props){

   const [inputValue, setInputValue] = useState('');

  return (
    <div className="mb-5 flex gap-2 justify-center">
      <input
        className="border p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => onSearch(inputValue)}>
        검색
      </button>
    </div>
  );
}


export default StudentSearch;