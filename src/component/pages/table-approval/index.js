let TableListApproval = () => {
    return (
        <div>
            <h1>Approval</h1>
            {/* <h3>Job Name : data.Job Name</h3> */}
            <h3>HR Name : data.HR Name</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Created</th>
                        <th>Approval</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>APPROVED</th>
                        <th>Done Approval</th>
                        <th>10/24/2025</th>
                        <th>10/25/2025</th>
                        <th>
                            <button>APPROVED</button>
                            <button>REJECTED</button>
                        </th>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default TableListApproval