import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getName } from "../../../services/candidateEmployeeService";

let NewLayout = () => {
    // State
    const [request, setRequest] = useState({
        username: ""
    })
    const [role, setRole] = useState()
    const [name, setName] = useState({})
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
        isFetching
    } = useQuery({
        queryKey: ["name", request],
        queryFn: () => getName(request),
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    })
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setName(data?.data);
            // console.log(name); 
        }

        if (localStorage.getItem("username") != null) {
            setRequest({ username: localStorage.getItem("username") })
        }

        if (localStorage.getItem("role") != null) {
            setRole(localStorage.getItem("role"))
        }
    }, [data, isSuccess])

    // Do Log out
    let handeLogOut = () => {
        localStorage.clear();
        window.location.href = "/signin";
    }

    const navigate = useNavigate();

    const handleProfile = () => {
        navigate("/profile", {state:{username: request.username}})
    }

    return (
        <div className="fix-header fix-sidebar card-no-border">
            <div className="preloader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" /> </svg>
            </div>
            <div id="main-wrapper">
                <header className="topbar">
                    <nav className="navbar top-navbar navbar-expand-md navbar-light">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/home">
                                <b>
                                    <img src="../assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                                    <img src="../assets/images/logo-light-icon.png" alt="homepage" className="light-logo" />
                                </b>
                            </Link>
                        </div>
                    </nav>
                </header>
                <aside className="left-sidebar">
                    <div className="user-profile">
                        <div className="profile-img">
                            <img src="../assets/images/users/1.jpg" alt="user" />
                        </div>
                        <div className="profile-text">
                            <a href="#" className="dropdown-toggle link u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">{name.firstName} {name.lastName} <span className="caret"></span></a>
                            {(role === "candidate") &&
                                <div className="dropdown-menu animated flipInY">
                                    <a onClick={handleProfile} className="dropdown-item"><i className="ti-user"></i> My Profile</a>
                                    <div className="dropdown-divider"></div> <a href="/account" className="dropdown-item"><i className="ti-settings"></i> Account Setting</a>
                                    <div className="dropdown-divider"></div> <a href="/signin" onClick={handeLogOut} className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a>
                                </div>
                            }
                            {(role === "hr" || role === "user" || role === "admin") &&
                                <div className="dropdown-menu animated flipInY">
                                    <a href="/account" className="dropdown-item"><i className="ti-settings"></i> Account Setting</a>
                                    <div className="dropdown-divider"></div> <a href="/signin" onClick={handeLogOut} className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a>
                                </div>
                            }
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            {(role === "candidate") &&
                                <>
                                    <li className="nav-small-cap">FEATURE</li>
                                    <li>
                                        <ul>
                                            <li><Link to="/job">VACANCY</Link></li>
                                            <li><Link to="/application">APPLICATION</Link></li>
                                        </ul>
                                    </li>
                                </>
                            }
                            {(role === "hr") &&
                                <>
                                    <li className="nav-small-cap">FEATURE</li>
                                    <li>
                                        <ul aria-expanded="false" >
                                            <li><Link to="/candidate">CV BANK</Link></li>
                                            <li><Link to="/approval/hr">APPROVAL</Link></li>
                                            <li><Link to="/schedule">INTERVIEW SCHEDULE</Link></li>
                                            <li><Link to="/job">VACANCY</Link></li>
                                        </ul>
                                    </li>
                                </>
                            }
                            {(role === "user") &&
                                <>
                                    <li className="nav-small-cap">FEATURE</li>
                                    <li>
                                        <ul>
                                            <li><Link to="/schedule">INTERVIEW SCHEDULE</Link></li>
                                        </ul>
                                    </li>
                                </>
                            }
                            {(role === "admin") &&
                                <>
                                    <li className="nav-small-cap">FEATURE</li>
                                    <li>
                                        <ul>
                                            <li><Link to="/user">SET USER</Link></li>
                                            <li><Link to="/job">VACANCY</Link></li>
                                        </ul>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                    <div className="sidebar-footer">
                        <a href="" className="link" data-toggle="tooltip" title="Settings"><i className="ti-settings"></i></a>
                        <a href="" className="link" data-toggle="tooltip" title="Email"><i className="mdi mdi-gmail"></i></a>
                        <a href="" className="link" data-toggle="tooltip" title="Logout"><i className="mdi mdi-power"></i></a>
                    </div>
                </aside>
                <div className="page-wrapper" style={{ backgroundColor: "#edeff1ff", minHeight: "100vh" }}>
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                    <footer className="footer">
                        © 2017 Monster Admin by wrappixel.com
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default NewLayout;