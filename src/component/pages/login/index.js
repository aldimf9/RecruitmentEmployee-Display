import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { signIn } from "../../../services/loginService"
import { data, Link } from "react-router-dom"

let Login = () => {

    // Body Login 
    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const [loading, setLoading] = useState(true);

    // Post SignIn
    const {
        mutate: signInApp,
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: signIn,
    })

    // Check and Get Token
    useEffect(() => {
        if (isSuccess && data) {
            localStorage.setItem("token", data.data);
            const parts = data.data.split('.');
            const decodedPayload = atob(parts[1]);
            const parsedPayload = JSON.parse(decodedPayload);
            localStorage.setItem("username", parsedPayload.sub);
            localStorage.setItem("role", parsedPayload.role);
            window.location.href = "/home";
        }
    }, [isSuccess, data])

    const handleOnChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (login.username != "" && login.password != "") {
            signInApp(login);
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            {loading &&
                <div className="preloader">
                    <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" /> </svg>
                </div>
            }

            <section id="wrapper">
                <div className="login-register" style={{ backgroundImage: "url('../assets/images/gallery/recru.jpg')" }}>
                    <div className="login-box card">
                        <div className="card-body">
                            <form className="form-horizontal form-material" id="loginform" action="index.html">
                                <h3 className="box-title m-b-20">Sign In</h3>
                                <div className="form-group ">
                                    <div className="col-xs-12">
                                        <input name="username" className="form-control" onChange={e => handleOnChange(e)} type="text" required="" placeholder="Username" value={login?.username} /> </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <input name="password" className="form-control" onChange={e => handleOnChange(e)} type="password" required="" placeholder="Password" value={login?.password} /> </div>
                                </div>
                                <div className="form-group text-center m-t-20">
                                    <div className="col-xs-12">
                                        <button onClick={e => handleLogin(e)} disabled={isLoading} className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
                                    </div>
                                </div>
                                <div className="form-group m-b-0">
                                    <div className="col-sm-12 text-center">
                                        <p>Don't have an account? <a href="/signup" className="text-info m-l-5"><b>Sign Up</b></a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login