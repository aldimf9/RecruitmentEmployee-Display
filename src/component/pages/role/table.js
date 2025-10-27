import { useEffect, useState } from "react";

let TableRole = () => {
    const [role, setRole] = useState([{}]);
    useEffect(() => {
        fetch("http://localhost:9000/api/role",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTQ5NzU3LCJleHAiOjE3NjE3NjU3NTd9.aZlGuZ527xnDYABK9uZP-JY2dKO8ieyHDRFJfGpvwvA",
                    "token": "RECRUBATM"
                }
            }
        ).
            then((response) => response.json()).
            then((data) => setRole(data.data)).
            catch((error) => console.log(error))
    }, [])
    return (
        <div>
            <h1>Role</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {role?.map(x => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        </div>
    )
}

export default TableRole;