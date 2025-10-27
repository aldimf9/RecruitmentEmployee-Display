import { useEffect, useState } from "react"

let TableListJobVacancy = () => {
    let [job,setJob] = useState([{}])
     useEffect(() => {
        fetch("http://localhost:9000/api/job-vacancy",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
                    "token": "RECRUBATM"
                }
            }
        ).
            then((response) => response.json()).
            then((data) => setJob(data.data)).
            catch((error) => console.log(error))
    }, [])
    return (
        <div>
            <h1>Job Vacancy</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                     {job?.map(x => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                    <td>{x.description}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        </div>
    )
}

export default TableListJobVacancy