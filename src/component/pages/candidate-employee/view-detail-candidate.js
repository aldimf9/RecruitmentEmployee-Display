import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCertificationDataByUserId, removeCertificationData } from "../../../services/certificationService";
import { getProfile } from "../../../services/candidateEmployeeService";
import { getOrganizationDataByUserId, removeOrganizationData } from "../../../services/organizationService";
import { getProfessionalDataByUserId, removeProfessionalData } from "../../../services/professionalService";
import { getProjectDataByUserId, removeProjectData } from "../../../services/projectService";

let ViewDetailCandidate = ({ username }) => {
    const [profile, setProfile] = useState({})

    const queryClient = useQueryClient();

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
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 30000000
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
    //     console.log(certificate);
    // }, [certificate])

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
                            <hr className="m-t-0 m-b-10" />
                            <div className="row">
                                <div className="col-md-6">
                                    <small className="text-muted">Name</small>
                                    <h6>{profile.firstName} {profile.lastName}</h6>
                                </div>
                                <div className="col-md-6">
                                    <small className="text-muted">Birth:</small>
                                    <h6>{profile.city_date} / {profile.birth_date}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <small className="text-muted">Address:</small>
                                    <h6>{profile.address}</h6>
                                </div>
                                <div className="col-md-6">
                                    <small className="text-muted">Phone Number:</small>
                                    <h6>{profile.phoneNumber}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <small className="text-muted">Curiculum Vitae</small>
                                    <h6>{profile.curiculumVitae}</h6>
                                </div>
                                <div className="col-md-6">
                                    <small className="text-muted">Portofolio:</small>
                                    <h6>{profile.portofolio}</h6>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

            {localStorage.getItem("role") === "hr" && (
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
                                            <th></th>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectData?.map(x => (
                                            <tr key={x.id}>
                                                <td>{x.name}</td>
                                                <td>{x.description}</td>
                                                <td>{x.additionaly_file || ""}</td>
                                                <td>{x.projectType}</td>
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
            )}
        </div>
    )
}

export default ViewDetailCandidate;