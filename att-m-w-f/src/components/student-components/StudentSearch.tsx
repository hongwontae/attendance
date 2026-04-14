import {memo} from 'react';

type Props = {
    value : string;
    onChange : (value : string)=>void;
}

function StudentSearch({value, onChange} : Props){


  return (
    <div className="mb-5">
      <input
        className="border p-2 rounded-2xl font-pretendard"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}


export default memo(StudentSearch);