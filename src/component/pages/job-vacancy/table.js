import { useEffect, useState } from "react"
import { getAllJobForUser } from "../../../services/jobService";
import { useQuery } from "@tanstack/react-query";

let TableListJobVacancy = () => {
    let [job,setJob] = useState([{}])
    const { data, isSuccess, isLoading, isError, error, isFetching } =
        useQuery({
            queryKey: ["job"],
            queryFn: getAllJobForUser,
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
    if (isLoading) return <p>Loading</p>
    if (isFetching) return <p>Fetching</p>
    return (
        <div>
            <h1>Job Vacancy</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                     {job?.map(x => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                    <td>{x.description}</td>
                                    <button>Detail</button>
                                </tr>             
                            )
                        })
                    }
                </tbody>
            </table >
        </div>
    )
}

export default TableListJobVacancy