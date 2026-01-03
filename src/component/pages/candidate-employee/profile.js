import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProfile } from "../../../services/candidateEmployeeService";
import { Link, useLocation } from "react-router-dom";
import ModalFormEditProfile from "../../organisms/form-edit-profile";
import ModalFormCreateCertification from "../../organisms/form-create-certification";
import ModalFormEditCertification from "../../organisms/form-edit-certification";
import { getCertificationDataByUserId, removeCertificationData } from "../../../services/certificationService";
import { getOrganizationDataByUserId, removeOrganizationData } from "../../../services/organizationService";
import ModalFormCreateOrganization from "../../organisms/form-create-organization";
import ModalFormEditOrganization from "../../organisms/form-edit-organization";
import ModalFormCreateProfessional from "../../organisms/form-create-professional";
import { getProfessionalDataByUserId, removeProfessionalData } from "../../../services/professionalService";
import ModalFormEditProfessional from "../../organisms/form-edit-professional";
import ModalFormCreateProject from "../../organisms/form-create-project";
import { getProjectDataByUserId, removeProjectData } from "../../../services/projectService";
import ModalFormEditProject from "../../organisms/form-edit-project";
import { doApproval } from "../../../services/approvalService";
import ModalFormCreateInterviewSchedule from "../../organisms/form-create-interview-schedule";

let Profile = () => {

    const [profile, setProfile] = useState({})

    const { state } = useLocation();
    const { username, action } = state;

    // this state for trigger modal for reload data 
    const [modalKey, setModalKey] = useState(0)

    const [selectedData, setSelectedData] = useState({})

    const queryClient = useQueryClient();


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

    // Get Profille
    const {
        data,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile({ username }),
        enabled: true,
        // staleTime: 300000,
        // cacheTime: 300000,
        // refetchInterval: 30000000
    })
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setProfile(data.data);
            // console.log(data.data);
        }
    }, [data, isSuccess])

    const [certificate, setCertificate] = useState([])

    const {
        data: CertificateDataByUserId,
        isSuccess: CertificateDataByUserIdSuccess,
    } = useQuery({
        queryKey: ["certificate-by-userId"],
        queryFn: () => getCertificationDataByUserId(profile.id),
        enabled: !!profile.id,
        staleTime: 0
    });
    useEffect(() => {
        if (CertificateDataByUserId?.data != null && CertificateDataByUserIdSuccess) {
            setCertificate(CertificateDataByUserId.data)
        }
    }, [CertificateDataByUserId, CertificateDataByUserIdSuccess]);

    // useEffect(() => {
    //     console.log(username);
    // }, [username])

    const {
        mutate: deleteCertificate,
        isLoading: loadingDeleteCertificate
    } = useMutation({
        mutationFn: removeCertificationData,
        onSuccess: () => {
            queryClient.invalidateQueries(["certificate-by-userId"])
        }
    })

    const handleDeleteCertificate = (id) => {
        deleteCertificate(id)
    }

    const [organizationData, setOrganizationData] = useState([])

    const {
        data: organizationDataByUserId,
        isSuccess: getOrganizationDataSuccess,
    } = useQuery({
        queryKey: ["organization-by-userId"],
        queryFn: () => getOrganizationDataByUserId(profile.id),
        enabled: !!profile.id,
        staleTime: 0
    })
    useEffect(() => {
        if (organizationDataByUserId?.data !== undefined && getOrganizationDataSuccess) {
            setOrganizationData(organizationDataByUserId.data)
        }
    }, [organizationDataByUserId, getOrganizationDataSuccess])

    // useEffect(() => {
    //     console.log(organizationData);

    // },[organizationData])

    const {
        mutate: deleteOrganization,
        isLoading: loadingDeleteOrganization
    } = useMutation({
        mutationFn: removeOrganizationData,
        onSuccess: () => {
            queryClient.invalidateQueries(["organization-by-userId"])
        }
    })

    const handleDeleteOrganization = (id) => {
        deleteOrganization(id)
    }

    const [professionalData, setProfessionalData] = useState([])

    const {
        data: professionalDataByUserId,
        isSuccess: getProfessionalDataSuccess,
    } = useQuery({
        queryKey: ["professional-by-userId"],
        queryFn: () => getProfessionalDataByUserId(profile.id),
        enabled: !!profile.id,
        staleTime: 0
    })
    useEffect(() => {
        if (professionalDataByUserId?.data !== undefined && getProfessionalDataSuccess) {
            setProfessionalData(professionalDataByUserId.data)
        }
    }, [professionalDataByUserId, getProfessionalDataSuccess])

    const {
        mutate: deleteProfessional,
        isLoading: loadingDeleteProfessional
    } = useMutation({
        mutationFn: removeProfessionalData,
        onSuccess: () => {
            queryClient.invalidateQueries(["professional-by-userId"])
        }
    })

    const handleDeleteProfessional = (id) => {
        deleteProfessional(id)
    }

    const [projectData, setProjectData] = useState([])

    const {
        data: projectDataByUserId,
        isSuccess: getProjectDataSuccess,
    } = useQuery({
        queryKey: ["project-by-userId"],
        queryFn: () => getProjectDataByUserId(profile.id),
        enabled: !!profile.id,
        staleTime: 0
    })
    useEffect(() => {
        if (projectDataByUserId?.data !== undefined && getProjectDataSuccess) {
            setProjectData(projectDataByUserId.data)
        }
    }, [projectDataByUserId, getProjectDataSuccess])

    const {
        mutate: deleteProject,
        isLoading: loadingDeleteProject
    } = useMutation({
        mutationFn: removeProjectData,
        onSuccess: () => {
            queryClient.invalidateQueries(["project-by-userId"])
        }
    })

    const handleDeleteProject = (id) => {
        deleteProject(id)
    }

    // --- Mutation Approval
    const {
        mutate: approvalCandidate,
        data: dataApproved,
        isLoading: isLoadingApproved,
        isSuccess: isSuccessApproved,
        isError: isErrorApproved,
        error: errorApproved,
    } = useMutation({
        mutationFn: doApproval,
    });

    const handleApproved = (id) => {
        approvalCandidate({ id, approved });
    };

    const handleRejected = (id) => {
        approvalCandidate({ id, rejected });
    };

    return (
        <div>
            <div className="card card-outline-info">
                <div className="card-header">
                    <h4 className="m-b-0 text-white">PROFILE</h4>
                </div>
                <div className="card-body">
                    <form className="form-horizontal" role="form">
                        <div className="form-body">
                            <h3 className="box-title">Person Info</h3>
                            <hr className="m-t-0 m-b-40" />
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">First Name:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.firstName} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">Last Name:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.lastName} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">Address:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.address} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">Date of Birth:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static">{profile.birth_date} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">City of Birth:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.city_date} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">Phone Number:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.phoneNumber} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">Curiculum Vitae:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.curiculumVitae} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="control-label text-right col-md-3">Portofolio:</label>
                                        <div className="col-md-9">
                                            <p className="form-control-static"> {profile.portofolio} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div id="edit-profile" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4 className="modal-title">SETTING PROFILE</h4>
                                </div>
                                <div className="modal-body">
                                    <ModalFormEditProfile key={modalKey} data={selectedData} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {(action !== "SCREENING" || action === null) &&
                        <button onClick={() => {
                            setModalKey(prev => prev + 1);
                            setSelectedData(profile);
                        }} data-toggle="modal" data-target="#edit-profile" type="button" className="btn btn-rounded btn-info" >
                            EDIT
                        </button>
                    }
                    <div id="create-interview" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4 className="modal-title">INTERVIEW SCHEDULE</h4>
                                </div>
                                <div className="modal-body">
                                    <ModalFormCreateInterviewSchedule key={modalKey}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {action === "SCREENING" &&
                        <>
                            <button className="btn btn-rounded btn-success" onClick={() => setModalKey(prev => prev + 1)} data-toggle="modal" data-target="#create-interview">APPROVED</button>
                            <button className="btn btn-rounded btn-danger" onClick={() => handleRejected(profile?.id)} disabled={isLoadingApproved} >REJECTED</button>
                        </>
                    }
                </div >
            </div >



            <div id="accordionexample" className="accordion" role="tablist" aria-multiselectable="true">
                <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                        <h5 className="mb-0">
                            <a data-toggle="collapse" data-parent="#accordionexample" href="#certification" aria-expanded="true" aria-controls="collapseexaOne">
                                Certification
                            </a>
                        </h5>
                    </div>
                    <div id="certification" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                        <div className="card-body">
                            <div className="container my-4">
                                <div className="row align-items-center">
                                    {/* Kolom kiri (kosong untuk jarak kiri) */}
                                    <div className="col-md-3"></div>

                                    {/* Kolom tengah (judul di tengah) */}
                                    <div className="col-md-6 text-center">
                                        <h1>Certification</h1>
                                    </div>

                                    {/* Kolom kanan (tombol di kanan) */}
                                    <div className="col-md-3 text-right">
                                        <div id="create-certification" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                        <h4 className="modal-title">ADD CERTIFICATION</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ModalFormCreateCertification key={modalKey} userId={profile.id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {(action !== "SCREENING" || action === null) &&
                                            <button onClick={() => setModalKey(prev => prev + 1)} className="btn btn-success btn-rounded text-white" data-toggle="modal" data-target="#create-certification">
                                                ADD
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id="edit-certification" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 className="modal-title">EDIT CERTIFICATION</h4>
                                        </div>
                                        <div className="modal-body">
                                            <ModalFormEditCertification key={modalKey} data={selectedData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped color-bordered-table info-bordered-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Additionaly File</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        {(action !== "SCREENING" || action === null) &&
                                            <th></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificate?.map(x => (
                                        <tr key={x.id}>
                                            <td>{x.name}</td>
                                            <td>{x.description}</td>
                                            <td>{x.addtional_file || "-"}</td>
                                            <td>{x.available_start_date} to {x.available_end_date}</td>
                                            <td>{x.certificationType}</td>
                                            {(action !== "SCREENING" || action === null) &&
                                                <td>
                                                    <button onClick={() => {
                                                        setModalKey(prev => prev + 1);
                                                        setSelectedData(x);
                                                    }} className="btn btn-rounded btn-info" data-toggle="modal" data-target="#edit-certification">EDIT</button>
                                                    <Link to={"/profile"}>
                                                        <button onClick={() => handleDeleteCertificate(x.id)} onLoad={loadingDeleteCertificate} className="btn btn-rounded btn-danger text-white">REMOVE</button>
                                                    </Link>
                                                </td>
                                            }
                                        </tr>
                                    )
                                    )
                                    }
                                </tbody>
                            </table >
                        </div>
                    </div>
                </div>



                <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" data-parent="#accordionexample" href="#organization" aria-expanded="false" aria-controls="collapseexaTwo">
                                Organization
                            </a>
                        </h5>
                    </div>
                    <div id="organization" className="collapse show" role="tabpanel" aria-labelledby="headingTwo">
                        <div className="card-body">
                            <div className="container my-4">
                                <div className="row align-items-center">
                                    {/* Kolom kiri (kosong untuk jarak kiri) */}
                                    <div className="col-md-3"></div>

                                    {/* Kolom tengah (judul di tengah) */}
                                    <div className="col-md-6 text-center">
                                        <h1>Organization</h1>
                                    </div>

                                    {/* Kolom kanan (tombol di kanan) */}
                                    <div className="col-md-3 text-right">
                                        <div id="create-organization" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                        <h4 className="modal-title">ADD ORGANIZATION</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ModalFormCreateOrganization key={modalKey} userId={profile.id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {(action !== "SCREENING" || action === null) &&
                                            <button onClick={() => setModalKey(prev => prev + 1)} className="btn btn-success btn-rounded" data-toggle="modal" data-target="#create-organization">
                                                ADD
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id="edit-organization" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 className="modal-title">EDIT ORGANIZATION</h4>
                                        </div>
                                        <div className="modal-body">
                                            <ModalFormEditOrganization key={modalKey} data={selectedData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped color-bordered-table info-bordered-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Company/Institution</th>
                                        <th>Additionaly File</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        {(action !== "SCREENING" || action === null) &&
                                            <th></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {organizationData?.map(x => (
                                        <tr key={x.id}>
                                            <td>{x.name}</td>
                                            <td>{x.description}</td>
                                            <td>{x.location}</td>
                                            <td>{x.additionaly_file || ""}</td>
                                            <td>{x.start_date} to {x.finish_date}</td>
                                            <td>{x.organizationType}</td>
                                            {(action !== "SCREENING" || action === null) &&
                                                <td>
                                                    <button onClick={() => {
                                                        setModalKey(prev => prev + 1);
                                                        setSelectedData(x);
                                                    }} className="btn btn-rounded btn-info" data-toggle="modal" data-target="#edit-organization">EDIT</button>
                                                    <button onClick={() => handleDeleteOrganization(x.id)} onLoad={loadingDeleteOrganization} className="btn btn-rounded btn-danger">REMOVE</button>
                                                </td>
                                            }
                                        </tr>
                                    )
                                    )
                                    }
                                </tbody>
                            </table >
                        </div>
                    </div>
                </div>



                <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" data-parent="#accordionexample" href="#professional" aria-expanded="false" aria-controls="collapseexaThree">
                                Professional
                            </a>
                        </h5>
                    </div>
                    <div id="professional" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                        <div className="card-body">
                            <div className="container my-4">
                                <div className="row align-items-center">
                                    {/* Kolom kiri (kosong untuk jarak kiri) */}
                                    <div className="col-md-3"></div>

                                    {/* Kolom tengah (judul di tengah) */}
                                    <div className="col-md-6 text-center">
                                        <h1>Professional</h1>
                                    </div>

                                    {/* Kolom kanan (tombol di kanan) */}
                                    <div className="col-md-3 text-right">
                                        <div id="create-professional" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                        <h4 className="modal-title">ADD PROFESSIONAL</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ModalFormCreateProfessional key={modalKey} userId={profile.id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {(action !== "SCREENING" || action === null) &&
                                            <button onClick={() => setModalKey(prev => prev + 1)} className="btn btn-success btn-rounded text-white" data-toggle="modal" data-target="#create-professional">
                                                ADD
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id="edit-professional" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 className="modal-title">EDIT PROFESSIONAL</h4>
                                        </div>
                                        <div className="modal-body">
                                            <ModalFormEditProfessional key={modalKey} data={selectedData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped color-bordered-table info-bordered-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Company/Institution</th>
                                        <th>Additionaly File</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        {(action !== "SCREENING" || action === null) &&
                                            <th></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {professionalData?.map(x => (
                                        <tr key={x.id}>
                                            <td>{x.name}</td>
                                            <td>{x.description}</td>
                                            <td>{x.location}</td>
                                            <td>{x.additionaly_file || ""}</td>
                                            <td>{x.start_date} to {x.finish_date}</td>
                                            <td>{x.profesionalType}</td>
                                            {(action !== "SCREENING" || action === null) &&
                                                <td>
                                                    <button onClick={() => {
                                                        setModalKey(prev => prev + 1);
                                                        setSelectedData(x);
                                                    }} className="btn btn-rounded btn-info" data-toggle="modal" data-target="#edit-professional">EDIT</button>
                                                    <button onClick={() => handleDeleteProfessional(x.id)} onLoad={loadingDeleteProfessional} className="btn btn-rounded btn-danger">REMOVE</button>
                                                </td>
                                            }
                                        </tr>
                                    )
                                    )
                                    }
                                </tbody>
                            </table >
                        </div>
                    </div>
                </div>



                <div className="card">
                    <div className="card-header" role="tab" id="headingFour">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" data-parent="#accordionexample" href="#project" aria-expanded="false" aria-controls="collapseexaThree">
                                Project
                            </a>
                        </h5>
                    </div>
                    <div id="project" className="collapse show" role="tabpanel" aria-labelledby="headingFour">
                        <div className="card-body">
                            <div className="container my-4">
                                <div className="row align-items-center">
                                    {/* Kolom kiri (kosong untuk jarak kiri) */}
                                    <div className="col-md-3"></div>

                                    {/* Kolom tengah (judul di tengah) */}
                                    <div className="col-md-6 text-center">
                                        <h1>Project</h1>
                                    </div>

                                    {/* Kolom kanan (tombol di kanan) */}
                                    <div className="col-md-3 text-right">
                                        <div id="create-project" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                        <h4 className="modal-title">ADD PROJECT</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ModalFormCreateProject key={modalKey} userId={profile.id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {(action !== "SCREENING" || action === null) &&
                                            <button onClick={() => setModalKey(prev => prev + 1)} className="btn btn-success btn-rounded text-white" data-toggle="modal" data-target="#create-project" >
                                                ADD
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id="edit-project" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 className="modal-title">ADD PROJECT</h4>
                                        </div>
                                        <div className="modal-body">
                                            <ModalFormEditProject key={modalKey} data={selectedData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped color-bordered-table info-bordered-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Additionaly File</th>
                                        <th>Type</th>
                                        {(action !== "SCREENING" || action === null) &&
                                            <th></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectData?.map(x => (
                                        <tr key={x.id}>
                                            <td>{x.name}</td>
                                            <td>{x.description}</td>
                                            <td>{x.additionaly_file || ""}</td>
                                            <td>{x.projectType}</td>
                                            {(action !== "SCREENING" || action === null) &&
                                                <td>
                                                    <button onClick={() => {
                                                        setModalKey(prev => prev + 1);
                                                        setSelectedData(x);
                                                    }} className="btn btn-rounded btn-info" data-toggle="modal" data-target="#edit-project">EDIT</button>
                                                    <button onClick={() => handleDeleteProject(x.id)} onLoad={loadingDeleteProject} className="btn btn-rounded btn-danger">REMOVE</button>
                                                </td>
                                            }
                                        </tr>
                                    )
                                    )
                                    }
                                </tbody>
                            </table >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;