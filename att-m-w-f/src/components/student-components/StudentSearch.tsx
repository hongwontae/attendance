
type Props = {
    value : string;
    onChange : (value : string)=>void;
}

function StudentSearch({value, onChange} : Props){


  return (
    <div className="mb-5 flex gap-2 justify-center">
      <input
        className="border p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}


export default StudentSearch;