import { Outlet } from "react-router-dom";

export default function Root() {
    return(
        <>
            <div>
                <h1>React contacts</h1>
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}