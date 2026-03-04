import { Outlet } from "react-router";

function LayoutPage(){

    return(
        <>
            <div>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default LayoutPage;