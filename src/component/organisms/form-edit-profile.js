import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { saveDataProfile } from "../../services/candidateEmployeeService";

let ModalFormEditProfile = ({ data }) => {

    const [request, setRequest] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        birth_date: "",
        city_date: "",
        curiculumVitae: "",
        portofolio: "",
    })
    useEffect(() => {
        setRequest({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            birth_date: data.birth_date,
            city_date: data.city_date,
            curiculumVitae: data.curiculumVitae,
            portofolio: data.portofolio,
        })
    }, [data])

    const queryClient = useQueryClient()

    const {
        mutate: SaveChangeDataProfile,
        isLoading,
        error
    } = useMutation({
        mutationFn: saveDataProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(["profile"])
        }
    })

    const handleChange = (e) => {
        setRequest({
            ...request,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        SaveChangeDataProfile( request )
    }

    return (
        <form action="#" className="form-horizontal form-bordered">
            <div className="form-body">
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">First Name</label>
                    <div className="col-md-9">
                        <input name="firstName" value={request?.firstName || ""} onChange={handleChange} type="text" placeholder="First Name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Last Name</label>
                    <div className="col-md-9">
                        <input name="lastName" value={request?.lastName || ""} onChange={handleChange} type="text" placeholder="Last Name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Address</label>
                    <div className="col-md-9">
                        <input name="address" value={request?.address || ""} onChange={handleChange} type="text" placeholder="Address" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Date of Birth</label>
                    <div className="col-md-9">
                        <input name="birth_date" value={request?.birth_date || ""} onChange={handleChange} type="date" className="form-control" placeholder="dd/mm/yyyy" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">City of Birth</label>
                    <div className="col-md-9">
                        <input name="city_date" value={request?.city_date || ""} onChange={handleChange} type="text" className="form-control" placeholder="City" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Curiculum VitaeV</label>
                    <div className="col-md-9">
                        <input name="curiculumVitae" value={request?.curiculumVitae || ""} onChange={handleChange} type="text" className="form-control" placeholder="CV" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Portofolio</label>
                    <div className="col-md-9">
                        <input name="portofolio" value={request?.portofolio || ""} onChange={handleChange} type="text" className="form-control" placeholder="Portofolio" />
                    </div>
                </div>
            </div>
            <div className="form-action">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="offset-sm-3 col-md-9">
                                <button data-dismiss="modal" onClick={handleSave} className="btn btn-rounded btn-success" onLoad={isLoading}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ModalFormEditProfile;