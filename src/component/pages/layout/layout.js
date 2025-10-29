import { Link, Outlet } from "react-router-dom";

let Layout = () => {
    return(
        <div>
            <nav>
                <Link to="/job">Job Vacancy</Link>
                <Link to="/offering">Approval</Link>
                <Link to="/roadmap">Roadmap</Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Layout;