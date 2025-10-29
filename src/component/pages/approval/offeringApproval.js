import { useEffect, useState } from "react"
import { doApproved, doRejected, getDataOffering } from "../../../services/approvalService";
import { useMutation, useQuery } from "@tanstack/react-query";

// let TableListApproval = (props) => {
let OfferingApproval = () => {
    // --- State
    const [offering, setOffering] = useState([]);
    const [id, setId] = useState(19);

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

    // --- Mutation 1: Approve
    const {
        mutate: approvCandidate,
        data: dataApproved,
        isLoading: isLoadingApproved,
        isSuccess: isSuccessApproved,
        isError: isErrorApproved,
        error: errorApproved,
    } = useMutation({
        mutationFn: doApproved,
    });

    const handleApproved = () => {
        approvCandidate({ id, approved });
    };

    // --- Mutation 2: Reject
    const {
        mutate: rejectCandidate,
        data: dataRejected,
        isLoading: isLoadingRejected,
        isSuccess: isSuccessRejected,
        isError: isErrorRejected,
        error: errorRejected,
    } = useMutation({
        mutationFn: doRejected,
    });

    const handleRejected = () => {
        rejectCandidate({ id, rejected });
    };

    return (
        <div>
            <h1>Approval</h1>
            {/* approval change to number */}
            {/* <button onClick={() => setApproval(approval+1)}>+</button>
            {approval}
            <button onClick={() => setApproval(approval-1)}>-</button> */}
            {/* <h3>Job Name : data.Job Name</h3> */}
            <h3>HR Name : data.HR Name</h3>
            <h2>Offering</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {offering?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.status}</td>
                                <td>{x.note}</td>
                                <td>
                                    <button onClick={() => doApproved()} disabled={isLoadingApproved} >APPROVED</button>
                                    <button onClick={() => doRejected()} disabled={isLoadingApproved} >REJECTED</button>
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

export default OfferingApproval