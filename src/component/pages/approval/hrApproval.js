import { useEffect, useState } from "react"
import { doApproval, getDataInterviewHr, getDataScreening } from "../../../services/approvalService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doApply, getApply } from "../../../services/roadmapService";
import ModalFormCreateInterviewSchedule from "../../organisms/form-create-interview-schedule";

let HrApproval = () => {
  // Get param -> perlu di sesuaikan nanti
  const param = useParams()
  const id = param.id;

  // --- State
  const [application, setApplication] = useState([]);
  const [interview, setInterview] = useState([]);
  const [modalKey, setModalKey] = useState();
  const [selectedId, setSelectedId] = useState();

  // --- Body post data
  const [approved] = useState({
    id: 0,
    status: "approved",
    note: null,
    userid: 0,
  });

  const [rejected] = useState({
    id: 0,
    status: "rejected",
    note: null,
    userid: 0,
  });

  let [apply, setApply] = useState({
    id: 0,
    action: "Screening CV",
    feedback: "Your Apply is Process",
    submit_date: null,
    candidateEmployee: 0,
    jobVacancy: 0,
  })

  // --- Query 2: Get Interview Data
  const {
    data: dataInterview,
    isSuccess: isSuccessInterview,
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

  // useEffect(() => {
  //   console.log(interview);

  // },[interview])

  // --- Query 3: Get Apply Data
  const {
    data: dataApply,
    isSuccess: isSuccessApply,
  } = useQuery({
    queryKey: ["screeningData"],
    queryFn: getApply,
    enabled: true,
    staleTime: 300000,
    cacheTime: 300000,
    refetchInterval: 30000000
  });

  useEffect(() => {
    if (dataApply?.data && isSuccessApply) {
      setApplication(dataApply.data)
    }
  }, [dataApply, isSuccessApply]);

  // --- Mutation Approval
  const {
    mutate: approvalCandidate,
    data: dataApproved,
    isLoading: isLoadingApproval,
    isSuccess: isSuccessApproved,
    isError: isErrorApproved,
    error: errorApproved,
  } = useMutation({
    mutationFn: doApproval,
  });

  // --- Mutation Screening
  const {
    mutate: screeningCVCandidate,
    data: dataScreeningCV,
    isLoading: isLoadingScreeningCV,
    isSuccess: isSuccessScreeningCV,
    isError: isErrorScreeningCV,
    error: errorScreeningCV,
  } = useMutation({
    mutationFn: doApply,
  });

  const handleApproved = () => {
    approvalCandidate({ id, approved });
  };

  const handleRejected = () => {
    approvalCandidate({ id, rejected });
  };

  const navigate = useNavigate();

  const handleScreening = (data) => {
    screeningCVCandidate(approved);
    navigate("/profile", { state: { username: data, action: "SCREENING" } })
  };

  return (
    <div>
      <div className="card">
        <ul className="nav nav-tabs customtab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#applicant" role="tab">
              <span className="hidden-sm-up">
                <i className="ti-home">
                </i>
              </span>
              <span className="hidden-xs-down">
                APPLICANT
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#interview" role="tab">
              <span className="hidden-sm-up">
                <i className="ti-email">
                </i>
              </span>
              <span className="hidden-xs-down">
                INTERVIEW HR
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#offering" role="tab">
              <span className="hidden-sm-up">
                <i className="ti-email">
                </i>
              </span>
              <span className="hidden-xs-down">
                PRE OFFERING
              </span>
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active p-20" id="applicant" role="tabpanel">
            <table className="table color-table info-table hover-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {application?.map(x => {
                  return (
                    <tr key={x.id}>
                      <td>{x.jobName}</td>
                      <td>{x.firstName} {x.lastName}</td>
                      <td>
                        <button className="btn btn-rounded btn-primary" onClick={() => handleScreening(x.username)} >
                          SCREENING
                        </button>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table >
          </div>
          <div className="tab-pane p-20" id="interview" role="tabpanel">
            <table className="table color-table info-table hover-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Approval</th>
                </tr>
              </thead>
              <tbody>
                {interview?.map(x => {
                  return (
                    <tr key={x.id}>
                      <td>{x.job}</td>
                      <td>{x.firstName} {x.lastName}</td>
                      <td>{x.status}</td>
                      <td>
                        <button className="btn btn-rounded btn-success" onClick={() => {
                          setModalKey(prev => prev + 1);
                          setSelectedId(x.id)
                        }} data-toggle="modal" data-target="#create-interview">APPROVED</button>
                        <button className="btn btn-rounded btn-danger" onClick={() => handleRejected()}>{isLoadingApproval ? "REJECT..." : "REJECTED"}</button>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table >
          </div>
          <div className="tab-pane p-20" id="offering" role="tabpanel">
            <table className="table color-table info-table hover-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Approval</th>
                </tr>
              </thead>
              <tbody>
                {interview?.map(x => {
                  return (
                    <tr key={x.id}>
                      <td>{x.job}</td>
                      <td>{x.firstName} {x.lastName}</td>
                      <td>{x.status}</td>
                      <td>
                        <button className="btn btn-rounded btn-success" onClick={() => handleApproved()}>{isLoadingApproval ? "APPROV..." : "APPROVED"}</button>
                        <button className="btn btn-rounded btn-danger" onClick={() => handleRejected()}>{isLoadingApproval ? "REJECT..." : "REJECTED"}</button>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table >
          </div>
          <div id="create-interview" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                  <h4 className="modal-title">INTERVIEW SCHEDULE</h4>
                </div>
                <div className="modal-body">
                  <ModalFormCreateInterviewSchedule key={modalKey} rdmpId={selectedId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HrApproval;


// For Do Apply Screening CV
// let ApplyVacancy = () => {
//     const [apply, setApply] = useState([{}]);
//     const [job, setJob] = useState({});
//     const [approval, setApproval] = useState({
//         id: 0,
//         action: "Screening CV",
//         feedback: null,
//         submit_date: null,
//         candidateEmployee: 19,
//         jobVacancy: 1,
//     });
//     useEffect(() => {
//         fetch("http://localhost:9000/api/apply/detail-candidate?id=1",
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
//                     "token": "RECRUBATM"
//                 }
//             }
//         ).
//             then((response) => response.json()).
//             then((data) => setApply(data.data)).
//             catch((error) => console.log(error))
//     }, [])

//     useEffect(() => {
//         fetch("http://localhost:9000/api/job-vacancy/detail?id=1",
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
//                     "token": "RECRUBATM"
//                 }
//             }
//         ).
//             then((response) => response.json()).
//             then((data) => setJob(data.data)).
//             catch((error) => console.log(error))
//     }, [])

//     const doScreening = () => {
//         fetch("http://localhost:9000/api/approval?id=19",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNTY1NDkwLCJleHAiOjE3NjE3ODE0OTB9.b_ngvu43ZZRYIs-WAjEInXlB-zcqTay3T_uKheis4m4",
//                     "token": "RECRUBATM"
//                 },
//                 body: JSON.stringify(apply)
//             }
//         ).
//             then((response) => response.json()).
//             then((data) => console.log(data)).
//             catch((error) => console.log(error))
//     }
//     return (
//         <div>
//             <h1>Applier</h1>
//             <h3>{job.name}</h3>
//             <h4>{job.description}</h4>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Phone Number</th>
//                         <th>Birth</th>
//                         <th>CV</th>
//                         <th>Portofolio</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {apply?.map(x => {
//                         return (
//                             <tr key={x.id}>
//                                 <td>{x.firstName} {x.lastName}</td>
//                                 <td>{x.address}</td>
//                                 <td>{x.phoneNumber}</td>
//                                 <td>{x.city_date}/{x.birth_date}</td>
//                                 <td>{x.curiculumVitae}</td>
//                                 <td>{x.portofolio}</td>
//                                 <td>
//                                     <button onClick={() => doScreening()} >Screening cv</button>
//                                 </td>
//                             </tr>
//                         )
//                     }
//                     )}
//                 </tbody>
//             </table >
//         </div>
//     )
// }