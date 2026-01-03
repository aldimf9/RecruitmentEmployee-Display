import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getCertificationTypeData } from "../../services/certificationTypeService"
import { saveCertificationData } from "../../services/certificationService"
import { Link } from "react-router-dom"

let ModalFormEditCertification = ({ data }) => {
    const [request, setRequest] = useState({
        id: 0,
        name: "",
        description: "",
        addtional_file: "",
        available_start_date: "",
        available_end_date: "",
        candidateEmployee: 0,
        certificationTypeId: 0
    })
    useEffect(() => {
        setRequest({
            id: data.id,
            name: data.name,
            description: data.description,
            addtional_file: data.addtional_file,
            available_start_date: data.available_start_date,
            available_end_date: data.available_end_date,
            candidateEmployee: data.candidateEmployee,
            certificationTypeId: data.certificationTypeId
        })
    }, [data])

    // useEffect(()=>{
    //     console.log(certificateDataById?.data);

    // },[certificateDataById])

    const [type, setType] = useState([])

    const {
        data: certificateTypeData,
        isSuccess: getCertificationTypeSuccess
    } = useQuery({
        queryKey: ["certification-type"],
        queryFn: getCertificationTypeData,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 300000
    })
    useEffect(() => {
        if (certificateTypeData?.data !== undefined && getCertificationTypeSuccess) {
            setType(certificateTypeData.data)
        }
    }, [certificateTypeData, getCertificationTypeSuccess])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRequest(prev => ({
            ...prev,
            [name]: name === "certificationTypeId" ? parseInt(value) : value
        }))
    }

    const {
        mutate: addNewCertificate,
        error,
        isLoading
    } = useMutation({
        mutationFn: saveCertificationData
    })

    const handleSave = () => {
        addNewCertificate({ request })
    }
    return (
        <form action="#" className="form-horizontal form-bordered">
            <div className="form-body">
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Name</label>
                    <div className="col-md-9">
                        <input name="name" onChange={handleChange} value={request?.name} type="text" placeholder="Name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Description</label>
                    <div className="col-md-9">
                        <input name="description" onChange={handleChange} value={request?.description} type="text" placeholder="Description" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Add File</label>
                    <div className="col-md-9">
                        <input name="addtional_file" onChange={handleChange} value={request?.addtional_file} type="text" placeholder="Add File" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Start Date</label>
                    <div className="col-md-9">
                        <input name="available_start_date" onChange={handleChange} value={request?.available_start_date} type="date" placeholder="Start Date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">End Date</label>
                    <div className="col-md-9">
                        <input name="available_end_date" onChange={handleChange} value={request?.available_end_date} type="date" placeholder="End Date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Type</label>
                    <div className="col-md-9">
                        <select className="form-control custom-select" name="certificationTypeId" value={request.certificationTypeId || ""} onChange={handleChange}>
                            <option value="">-- Pilih Type --</option>
                            {
                                type?.map((x) => (
                                    <option key={x.id} value={x.id}>{x.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <Link to={"/profile"}>
                        <button onClick={handleSave} onLoad={isLoading} className="btn btn-rounded btn-success text-white" data-dismiss="modal" >
                            SAVE
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default ModalFormEditCertification;