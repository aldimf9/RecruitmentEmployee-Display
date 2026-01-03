import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getOrganizationTypeData } from "../../services/organizationTypeService";
import { saveOrganizationData } from "../../services/organizationService";

let ModalFormEditOrganization = ({ data }) => {

    const [request, setRequest] = useState({
        id: 0,
        name: "",
        description: "",
        start_date: "",
        finish_date: "",
        location: "",
        additionaly_file: "",
        organizationTypeId: 0,
        candidateEmployee: 0
    })
    useEffect(() => {
        setRequest({
            id: data.id,
            name: data.name,
            description: data.description,
            start_date : data.start_date,
            finish_date : data.finish_date,
            location: data.location,
            additionaly_file: data.additionaly_file,
            organizationTypeId: data.organizationTypeId,
            candidateEmployee: data.candidateEmployee
        })
    }, [data])

    const [type, setType] = useState([])

    const {
        data: organizationTypeData,
        isSuccess: getOrganizationTypeDataSuccess
    } = useQuery({
        queryKey: ["organization-type"],
        queryFn: getOrganizationTypeData,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 300000
    })
    useEffect(() => {
        if (organizationTypeData?.data !== undefined && getOrganizationTypeDataSuccess) {
            setType(organizationTypeData.data)
        }
    }, [organizationTypeData, getOrganizationTypeDataSuccess])

    // useEffect(() => {
    //     console.log(request);

    // }, [request])

    const handleChange = (e) => {
        const { name, value } = e.target

        setRequest(prev => ({
            ...prev,
            [name]: name === "organizationTypeId" ? parseInt(value) : value
        }))
    }

    const queryClient = useQueryClient()

    const {
        mutate: addOrganizationData,
        isLoading
    } = useMutation({
        mutationFn: saveOrganizationData,
        onSuccess:() => {
            queryClient.invalidateQueries(["organization-by-userId"])
        }
    })

    const handleSave = () => {
        addOrganizationData(request)
    }

    return (
       <form action="#" className="form-horizontal form-bordered">
            <div className="form-body">
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Name</label>
                    <div className="col-md-9">
                        <input name="name" value={request.name} onChange={handleChange} type="text" placeholder="Name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Description</label>
                    <div className="col-md-9">
                        <input name="description" value={request.description} onChange={handleChange} type="text" placeholder="Description" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Add File</label>
                    <div className="col-md-9">
                        <input name="additionaly_file" value={request.additionaly_file || "-"} onChange={handleChange} type="text" placeholder="Add File" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Company/Institution</label>
                    <div className="col-md-9">
                        <input name="location" value={request.location} onChange={handleChange} type="text" placeholder="Company/Institution" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Start Date</label>
                    <div className="col-md-9">
                        <input name="start_date" value={request.start_date} onChange={handleChange} type="date" placeholder="Start Date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">End Date</label>
                    <div className="col-md-9">
                        <input name="finish_date" value={request.finish_date} onChange={handleChange} type="date" placeholder="End Date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Type</label>
                    <div className="col-md-9">
                        <select className="form-control custom-select" value={request.organizationTypeId || ""} name="organizationTypeId" onChange={handleChange} >
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
                    <button onClick={handleSave} onLoad={isLoading} className="btn btn-rounded btn-success text-white" data-dismiss="modal" >
                        SAVE
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ModalFormEditOrganization;