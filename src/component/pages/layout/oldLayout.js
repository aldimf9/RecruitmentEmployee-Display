import { Link, Outlet } from "react-router-dom";

let Layout = () => {
    const role = localStorage.getItem("role");
    let handeLogOut = () => {
        localStorage.clear();
        window.location.href = "/signin";
    }

    return (
        <div>
            <nav>
                {(role === "candidate") &&
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/job/active">Vacancy</Link>
                        <Link to="/offering">Approval</Link>
                        <Link to="/application">Application</Link>
                        <button onClick={handeLogOut}>Log Out</button>
                    </>
                }
                {(role === "hr") &&
                    <>
                        <Link to="/job">Vacancy</Link>
                        <Link to="/offering">Approval</Link>
                        <Link to="/roadmap">Application</Link>
                        <button onClick={handeLogOut}>Log Out</button>
                    </>
                }
                {(role === "user") &&
                    <>
                        <Link to="/job">Vacancy</Link>
                        <Link to="/offering">Approval</Link>
                        <Link to="/roadmap">Application</Link>
                        <button onClick={handeLogOut}>Log Out</button>
                    </>
                }
                {(role === "admin") &&
                    <>
                        <Link to="/job">Vacancy</Link>
                        <Link to="/offering">Approval</Link>
                        <Link to="/roadmap">Application</Link>
                        <button onClick={handeLogOut}>Log Out</button>
                    </>
                }
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;