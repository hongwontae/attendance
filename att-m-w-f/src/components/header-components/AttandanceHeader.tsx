import { Link } from "react-router";

function AttandanceHeader(){


    return(
        <>
            <header>
            <div className="flex flex-row justify-center gap-2">
                <Link to={'/student'}>Student</Link>
                <Link to={'/courses'}>Course</Link>
            </div>
            </header>
        </>
    )
}

export default AttandanceHeader;