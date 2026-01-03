import { useEffect, useState } from "react"
import { getAllJobForUserById } from "../../../services/jobService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doApply } from "../../../services/roadmapService";
import { useParams } from "react-router-dom";
import { getName } from "../../../services/candidateEmployeeService";

let DetailJob = () => {
    // State
    const [job, setJob] = useState({})
    const [request, setRequest] = useState({
        username: ""
    })
    const [name, setName] = useState({})
    const { id } = useParams()
    

    // Body Apply
    let [apply, setApply] = useState({
        id: 0,
        action: "Apply",
        feedback: "Your Apply is Process",
        submit_date: null,
        candidateEmployee: 0,
        jobVacancy: 0,
    })

    // Get Detail Job Data
    const {
        data: detailData,
        isSuccess: detailDataSuccess,
        isLoading: detailDataIsLoading,
        isError: detailDataIsError,
        error: detailDataError,
        isFetching: detailDataIsFetching } =
        useQuery({
            queryKey: ["jobById", id],
            queryFn: () => getAllJobForUserById(id),
            enabled: true,
            staleTime: 300000,
            cacheTime: 300000,
            refetchInterval: 30000000
        });

    // Get Data User
    const {
        data: userData,
        isLoading,
        isSuccess: userSuccess,
        isError,
        error,
        isFetching
    } = useQuery({
        queryKey: ["name", request],
        queryFn: () => getName(request),
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    })
    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username != null) {
            setRequest({ username })        
        }
    }, [])

    useEffect(() => {
        if (userSuccess && userData?.data) {
            setName(userData.data);
        }
    }, [userSuccess, userData]);

    useEffect(() => {
        if (detailDataSuccess && detailData?.data) {
            setJob(detailData.data);
        }
    }, [detailDataSuccess, detailData]);

    useEffect(() => {
        if (name?.id && job?.id) {
            setApply((prev) => ({
                ...prev,
                candidateEmployee: name.id,
                jobVacancy: job.id,
            }));
        }
    }, [name, job]);

    // --- Mutation 1: Apply
    const {
        mutate: applyCandidate,
        data: dataApply,
        isLoading: isLoadingApply,
        isSuccess: isSuccessApply,
        isError: isErrorApply,
        error: errorApply,
    } = useMutation({
        mutationFn: doApply,
    });

    const handleApply = () => {
        applyCandidate({ apply });
    };


    return (
        <div className="jumbotron">
            <h1 className="display-3">{job.name}</h1>
            <p className="lead">{job.description}</p>
            <hr className="my-4" />
            {/* <p>It uses utility classees for typography and spacing to space content out within the larger container.</p> */}
            <p className="lead">
                <button onClick={() => handleApply()} disabled={isLoadingApply} className="btn btn-primary btn-lg" href="/job/active" role="button">Apply</button>
            </p>
        </div>
    )
}

export default DetailJob