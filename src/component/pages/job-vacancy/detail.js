import { useEffect, useState } from "react"

let DetailJob = () => {
    const [job, setJob] = useState({})
    let [apply ,setApply] = useState({
        id: 0,
        action: "Apply",
        feedback: "Your Apply is Process",
        submit_date: null,
        candidateEmployee: 19,
        jobVacancy: 1
    })
    useEffect(() => {
        fetch("http://localhost:9000/api/job-vacancy/job-detail?id=1",
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
    let addApply = () => {
        fetch("http://localhost:9000/api/apply",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
                    "token": "RECRUBATM"
                },
                body: JSON.stringify(apply)
            }
        ).
        then((response) => response.json()).
        then((data) => console.log(data)).
        catch((error) => console.log(error))
    }
    return (
        <div>
            <h1>{job.name}</h1>
            <h4>{job.description}</h4>
            <button onClick={() => addApply()}>Apply</button>
        </div>

    )
}

export default DetailJob