import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { saveRequestData } from "../../services/jobService"

let ModalFormCreateJob = () => {

    const [request, setRequest] = useState({
        id: 0,
        name: "",
        description: "",
        status: false
    })

    const queryClient = useQueryClient();

    const {
        mutate: saveData,
        isLoading,
        error
    } = useMutation({
        mutationFn: saveRequestData,
        onSuccess: () => {
            queryClient.invalidateQueries(["job"])
        }

    })

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target

        setRequest({
            ...request,
            [name]: type === "checkbox" ? checked : value
        });
    }

    const handleSave = () => {
        saveData( request )
    }

    return (
        <div className="card-body">
            <form action="#" className="form-horizontal form-bordered">
                <div className="form-body">
                    <div className="form-group row">
                        <label className="control-label text-right col-md-3">Name</label>
                        <div className="col-md-9">
                            <input name="name" value={request?.name} onChange={handleChange} type="text" placeholder="Name" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="control-label text-right col-md-3">Description</label>
                        <div className="col-md-9">
                            <input name="description" value={request?.description} onChange={handleChange} type="text" placeholder="Description" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="control-label text-right col-md-3">Status</label>
                        <div className="col-md-9">
                            <input
                                name="status"
                                type="checkbox"
                                checked={request.status}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="offset-sm-3 col-md-9">
                                    <button onClick={handleSave} data-dismiss="modal" type="button" className="btn btn-success">{isLoading ? "Saving..." : "Save"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default ModalFormCreateJob;