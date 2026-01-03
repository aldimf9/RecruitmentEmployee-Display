import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllJobData } from "../../../services/jobService";
import { doApply } from "../../../services/roadmapService";
import { getName } from "../../../services/candidateEmployeeService";
import ModalFormEditJob from "../../organisms/form-edit-job";
import ModalFormCreateJob from "../../organisms/form-create-job";

let PagesJobVacancy = () => {

    // State
    const [job, setJob] = useState([{}])
    const [request, setRequest] = useState({
        username: ""
    });
    const [selectedIdJob, setSelectedIdJob] = useState({
        idJob: 0
    })
    const [apply, setApply] = useState({
        id: 0,
        action: "APPLY",
        feedback: null,
        submit_date: null,
        candidateEmployee: 0,
        jobVacancy: 0,
    })
    const [name, setName] = useState({})

    const [role, setRole] = useState("")
    useEffect(() => {
        if (localStorage.getItem("role") != "") {
            setRole(localStorage.getItem("role"));
        }
    }, []);

    // Get Data User
    const {
        data: userData,
        isLoading: userLoading,
        isSuccess: userSuccess,
        isFetching: userFetching
    } = useQuery({
        queryKey: ["name", request],
        queryFn: () => getName(request),
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    })
    useEffect(() => {
        if (userSuccess && userData?.data) {
            setName(userData.data);
        }
    }, [userSuccess, userData]);

    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username != null) {
            setRequest({ username })
        }
    }, [])

    // Get Job Data
    const { data, isSuccess, isLoading, isError, error, isFetching } =
        useQuery({
            queryKey: ["job"],
            queryFn: getAllJobData,
            enabled: true,
            staleTime: 300000,
            cacheTime: 300000,
            refetchInterval: 30000000
        });
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setJob(data?.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (apply?.candidateEmployee && apply?.jobVacancy) {
            applyCandidate({ apply });
        }
    }, [apply]);

    // Doing Apply
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

    const handleApply = (jobId) => {
        if (name?.id && jobId) {
            setApply((prev) => ({
                ...prev,
                candidateEmployee: name.id,
                jobVacancy: jobId,
            }));
        }
    };

    if (isLoading) return <p>Loading</p>
    if (isFetching) return <p>Fetching</p>
    return (
        <div>
            <div className="row">
                {(role === "hr" || role === "admin") &&
                    <div className="col-12">
                        <div className="row align-items-center">
                            {/* Kolom kiri (kosong untuk jarak kiri) */}
                            <div className="col-md-3"></div>

                            {/* Kolom tengah (judul di tengah) */}
                            <div className="col-md-6 text-center">
                                <h1>JOB OFFER</h1>
                            </div>

                            {/* Kolom kanan (tombol di kanan) */}
                            <div className="col-md-3 text-right">
                                <div id="createJob" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title" id="myModalLabel">CREATE NEW JOB</h4>
                                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            </div>
                                            <div className="modal-body">
                                                <ModalFormCreateJob />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button data-toggle="modal" data-target="#createJob" className="btn btn-success btn-rounded text-white">
                                    ADD
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {
                                job?.map(x => (
                                    <div className="col-lg-3 col-md-6 mb-4">
                                        <div key={x.id} className="card h-100 d-flex flex-column">
                                            <img className="card-img-top img-fluid" src="../assets/images/big/img1.jpg" alt="Card image cap" style={{ height: "180px", objectFit: "cover" }} />
                                            <div className="card-body d-flex flex-column">
                                                <h4 className="card-title">{x.name}</h4>
                                                <p className="card-text flex-grow-1 text-truncate" style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}>{x.description}</p>
                                                <div className="mt-auto">
                                                    <div>
                                                        <div id="editJob" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h4 className="modal-title" id="myModalLabel">EDIT JOB</h4>
                                                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <ModalFormEditJob idJob={selectedIdJob.idJob} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button data-toggle="modal" data-target="#editJob" onClick={() => setSelectedIdJob({ idJob: x.id })} className="btn btn-rounded btn-warning mr-2" type="button">
                                                                EDIT
                                                            </button>   
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )}
                        </div>
                    </div>
                }
                {(role === "candidate") &&
                    <div className="col-12">
                        <h1 className="d-inline">JOB</h1>
                        <p className="text-muted m-t-0">This job currently has open vacancies for motivated candidates who want to grow, contribute to projects, and build their careers in a supportive environment.</p>
                        <div className="row">
                            {
                                job?.filter(x => (x.status === true)).map(x => (
                                    <div className="col-lg-3 col-md-6 mb-4">
                                        <div key={x.id} className="card h-100 d-flex flex-column">
                                            <img className="card-img-top img-fluid" src="../assets/images/big/img1.jpg" alt="Card image cap" style={{ height: "180px", objectFit: "cover" }} />
                                            <div className="card-body d-flex flex-column">
                                                <h4 className="card-title">{x.name}</h4>
                                                <p className="card-text flex-grow-1 text-truncate" style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}>{x.description}</p>
                                                <div className="mt-auto">
                                                    <Link to={`/detail-job/${x.id}`}>
                                                        <button className="btn btn-rounded btn-warning mr-2">
                                                            DETAIL
                                                        </button>
                                                    </Link>
                                                    <button
                                                        className="btn btn-rounded btn-primary"
                                                        onClick={() => handleApply(x.id)}
                                                        onLoad={isLoadingApply}
                                                    >
                                                        APPLY
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PagesJobVacancy;