import { useState } from "react";

let RegisterRole = () => {
    let [role, setRole] = useState({
        id: 0,
        name: ""
    })
    let addRole = () => {
        fetch("http://localhost:9000/api/role",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTQ3NzI1LCJleHAiOjE3NjE1NDc5NDF9.YU77xfZ64c4-oL0i9NwEjBVXIJGU85GD-Vw6K20YHZM",
                    "token": "RECRUBATM"
                },
                body: JSON.stringify(role)
            }
        ).
        then((response) => response.json()).
        then((data) => console.log(data)).
        catch((error) => console.log(error))
    }
    let handleInput = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h1>Role</h1>
            <div>
                <div>
                    <label>Id</label>
                    <input name="id" onChange={(e) => handleInput(e)} value={role?.id} placeholder="Enter Your Id"></input>
                </div>
                <div>
                    <label>Name</label>
                    <input name="name" onChange={(e) => handleInput(e)} value={role?.name} placeholder="Enter Your New Role"></input>
                </div>
                <button onClick={() => addRole()}>Submit</button>
            </div>
        </div>
    )
}

export default RegisterRole