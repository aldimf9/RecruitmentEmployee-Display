let TableListRoadmapVacancy = () => {
    return (
        <div>
            <h1>Roadmap Vacancy</h1>
            {/* <h3>Job Name : data.Job Name</h3> */}
            <h3>Candidate Name : data.Candidate Name</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Feedback</th>
                        <th>Submit</th>
                        <th>Job Vacancy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Apply</th>
                        <th>Waiting for Approval</th>
                        <th>10/24/2025</th>
                        <th>Junior QA</th>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default TableListRoadmapVacancy