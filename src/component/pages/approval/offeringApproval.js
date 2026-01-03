import { useEffect, useState } from "react"
import { doApproval, doApproved, doRejected, getDataOffering } from "../../../services/approvalService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// let TableListApproval = (props) => {
let OfferingApproval = () => {
    // --- State
    const [offering, setOffering] = useState([]);

    // Get param
    const param = useParams()
    const id = param.id;

    // --- Body post data
    const [approved] = useState({
        id: 6,
        status: "approved",
        note: null,
        userid: 0,
    });

    const [rejected] = useState({
        id: 6,
        status: "rejected",
        note: null,
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

    // --- Query 1: Get Offering Data
    const {
        data: dataOffering,
        isSuccess: isSuccessOffering,
        isLoading: isLoadingOffering,
        isError: isErrorOffering,
        error: errorOffering,
        isFetching: isFetchingOffering,
    } = useQuery({
        queryKey: ["offering"],
        queryFn: getDataOffering,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    });

    useEffect(() => {
        if (dataOffering?.data && isSuccessOffering) {
            setOffering(dataOffering.data);
        }
    }, [dataOffering, isSuccessOffering]);

    // --- Mutation Approval
    const {
        mutate: approvalCandidate,
        data: dataApproved,
        isLoading: isLoadingApproved,
        isSuccess: isSuccessApproved,
        isError: isErrorApproved,
        error: errorApproved,
    } = useMutation({
        mutationFn: doApproval,
    });

    const handleApproved = () => {
        approvalCandidate({ id, approved });
    };

    const handleRejected = () => {
        approvalCandidate({ id, rejected });
    };

    return (
        <div>
            <div className="container my-4">
                <h1 className="text-center">Offering</h1>
            </div>
            {/* approval change to number */}
            {/* <button onClick={() => setApproval(approval+1)}>+</button>
            {approval}
            <button onClick={() => setApproval(approval-1)}>-</button> */}
            {/* <h3>Job Name : data.Job Name</h3> */}
            <table className="table table-striped color-bordered-table info-bordered-table">
                <thead>
                    <tr>
                        <th>Job</th>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {offering?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.status}</td>
                                <td>{x.note}</td>
                                <td>
                                    <button onClick={() => handleApproved()} disabled={isLoadingApproved} >APPROVED</button>
                                    <button onClick={() => handleRejected()} disabled={isLoadingApproved} >REJECTED</button>
                                </td>
                            </tr>
                        )
                    }
                    )} */}
                    <tr>
                        <td>Junior FullStack</td>
                        <td>Waiting for Approval</td>
                        <td>Please fill this approval with deadline at 24 Agustus 2025</td>
                        <td>
                            <button className="btn btn-rounded btn-success" onClick={() => handleApproved()} disabled={isLoadingApproved} >APPROVED</button>
                            <button className="btn btn-rounded btn-danger" onClick={() => handleRejected()} disabled={isLoadingApproved} >REJECTED</button>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default OfferingApproval;