import { useEffect, useState } from "react"

let ApplyVacancy = () => {
    const [apply, setApply] = useState([{}]);
    const [job, setJob] = useState({});
    const [approval, setApproval] = useState({
        id: 0,
        action: "Screening CV",
        feedback: null,
        submit_date: null,
        candidateEmployee: 19,
        jobVacancy: 1,
    });
    useEffect(() => {
        fetch("http://localhost:9000/api/apply/detail-candidate?id=1",
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
            then((data) => setApply(data.data)).
            catch((error) => console.log(error))  
    }, [])

    useEffect(() => {
        fetch("http://localhost:9000/api/job-vacancy/detail?id=1",
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

    const doScreening = () => {
        fetch("http://localhost:9000/api/approval?id=19",
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
            <h1>Applier</h1>
            <h3>{job.name}</h3>
            <h4>{job.description}</h4>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Birth</th>
                        <th>CV</th>
                        <th>Portofolio</th>
                    </tr>
                </thead>
                <tbody>
                    {apply?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.firstName} {x.lastName}</td>
                                <td>{x.address}</td>
                                <td>{x.phoneNumber}</td>
                                <td>{x.city_date}/{x.birth_date}</td>
                                <td>{x.curiculumVitae}</td>
                                <td>{x.portofolio}</td>
                                <td>
                                    <button onClick={() => doScreening()} >Screening cv</button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table >
        </div>
    )
}

export default ApplyVacancy