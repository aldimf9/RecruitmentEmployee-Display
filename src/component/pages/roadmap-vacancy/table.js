import { useEffect } from "react"

let TableListRoadmapVacancy = () => {

    useEffect(() => {
        fetch("http://localhost:9000/api/apply",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ2FuZGlkYXRlIiwic3ViIjoiYXJpIiwiaWF0IjoxNzYxNTQzODQ3LCJleHAiOjE3NjE1NDQwNjN9.uRlSobaXlqzOmceJ-yu1jAaaXqVx4a_AvnAtOMGkYyU",
                    "token": "RECRUBATM"
                }
            }
        ).
        then((response) => response.json()).
        then((data) => console.log(data)).
        catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <h1>Roadmap Vacancy</h1>
            {/* <h3>Job Name : data.Job Name</h3> */}
            <h3>Candidate Name : data.Candidate Name</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status Vacancy</th>
                        <th>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Junior QA</td>
                        <td>Apply</td>
                        <td>10/24/2025</td>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default TableListRoadmapVacancy