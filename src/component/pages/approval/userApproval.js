import { useMutation, useQuery } from "@tanstack/react-query";
import { doApproved, doRejected, getDataInterviewUser } from "../../../services/approvalService";
import { useEffect, useState } from "react";

let UserApproval = () => {
    // --- State
    const [interview, setInterview] = useState([]);
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

    // --- Query 1: Get Interview Data
    const {
        data: dataInterview,
        isSuccess: isSuccessInterview,
        isLoading: isLoadingInterview,
        isError: isErrorInterview,
        error: errorInterview,
        isFetching: isFetchingInterview,
    } = useQuery({
        queryKey: ["interview"],
        queryFn: getDataInterviewUser,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    });

    useEffect(() => {
        if (dataInterview?.data && isSuccessInterview) {
            setInterview(dataInterview.data);
        }
    }, [dataInterview, isSuccessInterview]);

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
            <h2>Interview User</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {interview?.map(x => {
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

export default UserApproval