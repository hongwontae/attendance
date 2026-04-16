import { Outlet } from "react-router";
import AttandanceHeader from "../../components/header-components/AttandanceHeader";

function LayoutPage(){

    return(
        <>
            <div>
                <AttandanceHeader></AttandanceHeader>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default LayoutPage;