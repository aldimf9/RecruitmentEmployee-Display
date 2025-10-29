import { useEffect, useState } from "react"
import { getAllJobForUserById } from "../../../services/jobService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doApply } from "../../../services/roadmapService";

let DetailJob = () => {
    // State
    const [job, setJob] = useState({})
    const [id, setId] = useState(1)

    // Body Apply
    let [apply, setApply] = useState({
        id: 0,
        action: "Apply",
        feedback: "Your Apply is Process",
        submit_date: null,
        candidateEmployee: 19,
        jobVacancy: 1
    })

    // Get Detail Job Data
    const { data, isSuccess, isLoading, isError, error, isFetching } =
        useQuery({
            queryKey: ["jobById",id],
            queryFn: () => getAllJobForUserById(id),
            enabled: true,
            staleTime: 300000,
            cacheTime: 300000,
            refetchInterval: 30000000
        });
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setJob(data?.data);
        }
    }, [data, isSuccess])

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
        <div>
            <h1>{job.name}</h1>
            <h4>{job.description}</h4>
            <button onClick={() => handleApply()} disabled={isLoadingApply}>Apply</button>
        </div>

    )
}

export default DetailJob