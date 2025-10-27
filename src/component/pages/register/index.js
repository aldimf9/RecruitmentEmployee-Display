import { useState } from "react"

let Register = () => {
    let [register, setRegister] = useState({
        firstName: null,
        lastName: null,
        address: null,
        phoneNumber: null,
        birthDate: null,
        cityDate: null,
        curiculumVitae: null,
        portofolio: null,
        username: null,
        password: null,
        role: 11
    })
    let signUp = () => {
        fetch("http://localhost:9000/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(register)
            }
        ).
            then((response) => response.json()).
            then((data) => console.log(data)).
            catch((error) => console.log(error))
    }
    let handleInput = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h1>Register</h1>
            <div>
                <div>
                    <label>First Name</label>
                    <input name="firstName" onChange={(e) => handleInput(e)} placeholder="Enter your First Name"></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="lastName" onChange={(e) => handleInput(e)} placeholder="Enter your Last Name"></input>
                </div>
                <div>
                    <label>Address</label>
                    <input name="address" onChange={(e) => handleInput(e)} placeholder="Enter your Domisile Address"></input>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input name="phoneNumber" onChange={(e) => handleInput(e)} placeholder="Enter your Phone Number(Example : 080000000000)"></input>
                </div>
                <div>
                    <label >Birth Date</label>
                    <input name="birthDate" onChange={(e) => handleInput(e)} type="date"></input>
                </div>
                <div>
                    <label>City Date</label>
                    <input name="cityDate" onChange={(e) => handleInput(e)} placeholder="Enter your where city birth"></input>
                </div>
                <div>
                    <label>CV</label>
                    <input name="curiculumVitae" onChange={(e) => handleInput(e)} placeholder="Enter your Link Curriculum Vitae"></input>
                </div>
                <div>
                    <label>Portofolio</label>
                    <input name="portofolio" onChange={(e) => handleInput(e)} placeholder="Enter your Link Portofolio"></input>
                </div>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={(e) => handleInput(e)} placeholder="Enter your New Username"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" onChange={(e) => handleInput(e)} type="password" placeholder="Enter your New Password"></input>
                </div>
                <button onClick={() => signUp()}>Submit</button>
            </div>
        </div>
    )
}

export default Register