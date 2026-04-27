import type { StudentType } from "../../types/student-type/student-type";

type Props = {
    student : StudentType
}

function CourseDetailStudent({student} : Props){



    return (
        <>
            <div>Hello-World</div>
            <div>{student?.name ?? "학생 없음"}</div>
        </>
    )

}

export default CourseDetailStudent;