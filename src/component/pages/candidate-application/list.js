import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplication } from "../../../services/candidateEmployeeService"
import ModalRoadmapApplication from "../../organisms/roadmap-application";

let ListApplicationCandidate = () => {
    // State
    const [request, setRequest] = useState({
        username: localStorage.getItem("username")
    });
    const [application, setApplication] = useState([{}]);
    const [selectedData, setSelectedData] = useState()

    // Get List Application 
    const { data, isSuccess, isLoading, isError, error, isFetching } =
        useQuery({
            queryKey: ["application", request],
            queryFn: () => getApplication(request),
            enabled: !!request.username,
            staleTime: 300000,
            cacheTime: 300000,
            refetchInterval: 30000000
        });
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setApplication(data?.data);
        }
    }, [data, isSuccess]);

    // useEffect(() => {
    //     console.log(data?.data);
    // }, [data])

    if (isLoading) return <p>Loading</p>
    if (isFetching) return <p>Fetching</p>
    return (
        <div>
            <div className="container my-4">
                <h1 className="text-center">Job Application</h1>
            </div>
            <table className="table table-striped color-bordered-table info-bordered-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Submit Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {application?.map(x => {

                        const applicationByNewStatus = x.roadmap?.length ? x.roadmap[x.roadmap.length - 1] : null;

                        return (
                            <tr key={x.id}>
                                <td>{x.job}</td>
                                <td>{applicationByNewStatus?.submit_date}</td>
                                <td>{applicationByNewStatus?.action}</td>
                                <td>
                                    <div id="roadmap" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="roadmapCandidate" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                </div>
                                                <div className="modal-body">
                                                    <ModalRoadmapApplication data={selectedData} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedData(x)} data-toggle="modal" data-target="#roadmap" className="btn btn-rounded btn-warning">
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    )
                    }
                </tbody>
            </table >
        </div>
    )
}

export default ListApplicationCandidate;