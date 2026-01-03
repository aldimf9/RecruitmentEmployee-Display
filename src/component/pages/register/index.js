import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { signUp } from "../../../services/registerService"

let Register = () => {

    // Body Sign Up data
    let [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        cityDate: "",
        curiculumVitae: "",
        portofolio: "",
        username: "",
        password: "",
        role: 11
    })

    // Post Sign Up
    const {
        mutate: signUpApp,
        data,
        isLoading,
        isSuccess,
        isError,
        error,

    } = useMutation({
        mutationFn: signUp
    })

    let handleOnChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    let handleSignUp = (e) => {
        signUpApp(register);
    }
    return (
        <div>
            <div className="preloader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" /> </svg>
            </div>
            <section id="wrapper">
                <div className="login-register" style={{ backgroundImage: "url('../assets/images/gallery/recru.jpg')" }}>
                    <div className="login-box card">
                        <div className="card-body">
                            <form className="form-horizontal form-material" id="loginform" action="index.html">
                                <h3 className="box-title m-b-20">Sign Up</h3>
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <input name="firstName" onChange={(e) => handleOnChange(e)} className="form-control" type="text" required="" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="col-xs-12">
                                        <input name="lastName" onChange={(e) => handleOnChange(e)} className="form-control" type="text" required="" placeholder="Last Name" />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="col-xs-12">
                                        <input name="username" onChange={(e) => handleOnChange(e)} className="form-control" type="text" required="" placeholder="Username" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <input name="password" onChange={(e) => handleOnChange(e)} className="form-control" type="password" required="" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-group text-center m-t-20">
                                    <div className="col-xs-12">
                                        <button onClick={() => handleSignUp()} disabled={isLoading} className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Sign Up</button>
                                    </div>
                                </div>
                                <div className="form-group m-b-0">
                                    <div className="col-sm-12 text-center">
                                        <p>Already have an account? <a href="/signin" className="text-info m-l-5"><b>Sign In</b></a></p>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register