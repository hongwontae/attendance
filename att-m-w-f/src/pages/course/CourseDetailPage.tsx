import { useParams } from "react-router";

function CourseDetailPage(){

    const {id} = useParams();

    return(
        <>
            <section className="font-pretendard font-bold">
                <h1>Course Detail Page</h1>
            </section>
        </>
    )
}

export default CourseDetailPage;