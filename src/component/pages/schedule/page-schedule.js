import { useMutation, useQuery } from "@tanstack/react-query";
import { getDataInterviewUser } from "../../../services/approvalService";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { getInterviewerScheduleData } from "../../../services/InterviewService";
import { getProfile } from "../../../services/candidateEmployeeService";
import ModalFormEditProfile from "../../organisms/form-edit-profile";
import ModalFormEditInterviewSchedule from "../../organisms/form-edit-interview-schedule";

let PageSchedule = () => {
    // --- State
    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState({})
    const [interview, setInterview] = useState([]);
    const [modalKey, setModalKey] = useState();
    const [selectedData, setSelectedData] = useState();

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, [localStorage.getItem("username")])

    const {
        data: getUserData,
        isSuccess: getUserDataSuccess,
    } = useQuery({
        queryKey: ["user-data"],
        queryFn: () => getProfile({ username }),
        enabled: !!username,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    })
    useEffect(() => {
        if (getUserData?.data != null && getUserDataSuccess) {
            setUserData(getUserData.data);
        }
    }, [getUserData, getUserDataSuccess])

    // --- Query 1: Get Interview Data
    const {
        data: dataInterview,
        isSuccess: isSuccessInterview,
    } = useQuery({
        queryKey: ["interview"],
        queryFn: () => getInterviewerScheduleData(userData.id),
        enabled: !!userData.id,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
    });

    useEffect(() => {
        if (dataInterview?.data && isSuccessInterview) {
            setInterview(dataInterview.data);
        }
    }, [dataInterview, isSuccessInterview]);

    // useEffect(() => {
    //     console.log(interview);
    // },[interview])

    const navigate = useNavigate();

    const handleDetail = (data) => {
        navigate("/candidate-detail", { state: { data: data, type: "INTERVIEW" } });
    }

    return (
        <div>
            {localStorage.getItem("role") === "hr" && (
                <>
                    <div className="card">
                        <ul className="nav nav-tabs customtab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#my-schedule" role="tab">
                                    <span className="hidden-sm-up">
                                        <i className="ti-home"></i>
                                    </span>
                                    <span className="hidden-xs-down">
                                        MY SCHEDULE
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#all-schedule" role="tab">
                                    <span className="hidden-sm-up">
                                        <i className="ti-home"></i>
                                    </span>
                                    <span className="hidden-xs-down">
                                        SCHEDULE
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active p-20" id="my-schedule" role="tabpanel">
                                <div className="container my-4">
                                </div>
                                <table className="table table-striped color-bordered-table info-bordered-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {interview?.map(x => {
                                            return (
                                                <tr key={x.id}>
                                                    <td>{x.firstName} {x.lastName}</td>
                                                    <td>{x.job}</td>
                                                    <td>
                                                        <button onClick={() => handleDetail(x)} className="btn btn-rounded btn-info">
                                                            DETAIL
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table >
                            </div>
                            <div className="tab-pane p-20" id="all-schedule" role="tabpanel">
                                <div className="container my-4">
                                </div>
                                <table className="table table-striped color-bordered-table info-bordered-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {interview?.map(x => {
                                            return (
                                                <tr key={x.id}>
                                                    <td>{x.firstName} {x.lastName}</td>
                                                    <td>{x.job}</td>
                                                    <td>
                                                        <button onClick={() => handleDetail(x)} className="btn btn-rounded btn-info mr-2">
                                                            DETAIL
                                                        </button>
                                                        <button onClick={() => {
                                                            setModalKey(prev => prev + 1);
                                                            setSelectedData(x);
                                                        }} className="btn btn-rounded btn-warning" data-toggle="modal" data-target="#edit-schedule">
                                                            EDIT
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table >
                            </div>
                            <div id="edit-schedule" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 className="modal-title">EDIT SCHEDULE</h4>
                                        </div>
                                        <div className="modal-body">
                                            <ModalFormEditInterviewSchedule key={modalKey} data={selectedData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* approval change to number */}
                    {/* <button onClick={() => setApproval(approval+1)}>+</button>
                {approval}
                <button onClick={() => setApproval(approval-1)}>-</button> */}
                    {/* <h3>Job Name : data.Job Name</h3> */}

                </>
            )}
            {localStorage.getItem("role") === "user" && (
                <>
                    {/* approval change to number */}
                    {/* <button onClick={() => setApproval(approval+1)}>+</button>
                {approval}
                <button onClick={() => setApproval(approval-1)}>-</button> */}
                    {/* <h3>Job Name : data.Job Name</h3> */}
                    <div className="container my-4">
                        <h1 className="text-center">Schedule</h1>
                    </div>
                    <table className="table table-striped color-bordered-table info-bordered-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Job</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {interview?.map(x => {
                                return (
                                    <tr key={x.id}>
                                        <td>{x.firstName} {x.lastName}</td>
                                        <td>{x.job}</td>
                                        <td>
                                            <button onClick={() => handleDetail(x)} className="btn btn-rounded btn-info">
                                                DETAIL
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table >
                </>
            )}

        </div>
    )
}

export default PageSchedule;