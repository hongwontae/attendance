import type { StudentType } from "../../types/student-type/student-type";

type Props = {
    students : StudentType[];
    buttonChangeEvent : (value : "info" | "students")=>void
}

function CourseStudents({students, buttonChangeEvent} : Props){

    console.log(students[0])


    return(
        <>
            <div>Hello - Students</div>
            <div>{students[0]?.name ?? "이름 없음"}</div>
            <button onClick={()=>buttonChangeEvent('info')}>Info</button>
        </>
    )

}

export default CourseStudents;