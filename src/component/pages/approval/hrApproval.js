import { useEffect, useState } from "react"
import { doApproved, doRejected, getDataInterviewHr, getDataScreening } from "../../../services/approvalService";
import { useMutation, useQuery } from "@tanstack/react-query";

let HrApproval = () => {
    // --- State
  const [screening, setScreening] = useState([]);
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

  // --- Query 1: Get Screening Data
  const {
    data: dataScreening,
    isSuccess: isSuccessScreening,
    isLoading: isLoadingScreening,
    isError: isErrorScreening, 
    error: errorScreening,
    isFetching: isFetchingScreening,
  } = useQuery({
    queryKey: ["screening"],
    queryFn: getDataScreening,
    enabled: true,
    staleTime: 300000,
    cacheTime: 300000,
    refetchInterval: 30000000
  });

  useEffect(() => {
    if (dataScreening?.data && isSuccessScreening) {
      setScreening(dataScreening.data);
    }
  }, [dataScreening, isSuccessScreening]);

  // --- Query 2: Get Interview Data
  const {
    data: dataInterview,
    isSuccess: isSuccessInterview,
    isLoading: isLoadingInterview,
    isError: isErrorInterview, 
    error: errorInterview,
    isFetching: isFetchingInterview,
  } = useQuery({
    queryKey: ["interview"],
    queryFn: getDataInterviewHr,
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
            <h3>HR Name : data.HR Name</h3>
            <h2>Screening CV</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {screening?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.status}</td>
                                <td>{x.note}</td>
                                <td>
                                    <button onClick={() => handleApproved()} disabled={isLoadingApproved} >APPROVED</button>
                                    <button onClick={() => handleRejected()} disabled={isLoadingRejected} >REJECTED</button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table >
            <h2>Interview HR</h2>
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
                                    <button onClick={() => handleApproved()} disabled={isLoadingApproved} >APPROVED</button>
                                    <button onClick={() => handleRejected()} disabled={isLoadingRejected} >REJECTED</button>
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

export default HrApproval
