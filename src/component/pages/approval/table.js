import { useEffect, useState } from "react"

// let TableListApproval = (props) => {
let TableListApproval = () => {
    const [approval, setApproval] = useState([{}]);
    const [approved, setApproved] = useState({
        id: 6,
        status: "Done Approval",
        note: "Approved",
        userid: 0,
    });
    const [rejected, setRejected] = useState({
        id: 6,
        status: "Done Approval",
        note: "Rejected",
        userid: 0,
    });
    // useEffect(() =>{
    //     console.log("without dependency"); 
    // }, [])
    // useEffect(() =>{
    //     console.log("with dependency");  
    // },[approval])

    // useEffect(() => {
    //     setApproval(props.data.data)
    //     const result = new Promise((pending,resolve,reject) => {
    //     let status = true;

    //     setTimeout(() => {
    //         if (status) {
    //             resolve("Data berhasil ditampilkan")
    //         } else {
    //             reject("data tidak berhasil ditampilkan")
    //         }            
    //     }, 2000);
    // }, [])

    // result
    //     .then((response) => console.log(response))
    //     .catch((error) => console.log(error))
    //     .finally(() => console.log("program selesai"))
    // }, [])

    useEffect(() => {
        fetch("http://localhost:9000/api/approval",
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
            then((data) => setApproval(data.data)).
            catch((error) => console.log(error))
    }, [])

    const doApproved = () => {
        fetch("http://localhost:9000/api/approval?id=19",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
                    "token": "RECRUBATM"
                },
                body: JSON.stringify(approved)
            }
        ).
            then((response) => response.json()).
            then((data) => console.log(data)).
            catch((error) => console.log(error))
    }

    const doRejected = () => {
        fetch("http://localhost:9000/api/approval?id=19",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
                    "token": "RECRUBATM"
                },
                body: JSON.stringify(rejected)
            }
        ).
            then((response) => response.json()).
            then((data) => console.log(data)).
            catch((error) => console.log(error))
    }

    return (
        <div>
            <h1>Approval</h1>
            {/* approval change to number */}
            {/* <button onClick={() => setApproval(approval+1)}>+</button>
            {approval}
            <button onClick={() => setApproval(approval-1)}>-</button> */}
            {/* <h3>Job Name : data.Job Name</h3> */}
            <h3>HR Name : data.HR Name</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {approval?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.status}</td>
                                <td>{x.note}</td>
                                <td>
                                    <button onClick={() =>  doApproved()} >APPROVED</button>
                                    <button onClick={() =>  doRejected()} >REJECTED</button>
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

export default TableListApproval