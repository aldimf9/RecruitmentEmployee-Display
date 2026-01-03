import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProjectTypeData } from "../../services/projectTypeService";
import { saveProjectData } from "../../services/projectService";

let ModalFormEditProject = ({ data }) => {

    const [request, setRequest] = useState({
        id: 0,
        name: "",
        description: "",
        additionaly_file: "",
        projectTypeId: 0,
        candidateEmployee: 0
    })
    useEffect(() => {
        setRequest({
            id: data.id,
            name: data.name,
            description: data.description,
            additionaly_file: data.additionaly_file,
            projectTypeId: data.projectTypeId,
            candidateEmployee: data.candidateEmployee
        })
    }, [data])

    const [type, setType] = useState([])

    const {
        data: projectTypeData,
        isSuccess: getProjectTypeDataSuccess
    } = useQuery({
        queryKey: ["project-type"],
        queryFn: getProjectTypeData,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 300000
    })
    useEffect(() => {
        if (projectTypeData?.data !== undefined && getProjectTypeDataSuccess) {
            setType(projectTypeData.data)
        }
    }, [projectTypeData, getProjectTypeDataSuccess])

    // useEffect(() => {
    //     console.log(request);

    // }, [request])

    const handleChange = (e) => {
        const { name, value } = e.target

        setRequest(prev => ({
            ...prev,
            [name]: name === "ProjectTypeId" ? parseInt(value) : value
        }))
    }

    const queryClient = useQueryClient()

    const {
        mutate: addProjectData,
        isLoading
    } = useMutation({
        mutationFn: saveProjectData,
        onSuccess: () => {
            queryClient.invalidateQueries(["project-by-userId"])
        }
    })

    const handleSave = () => {
        addProjectData(request)
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
                        <input name="additionaly_file" value={request.additionaly_file || ""} onChange={handleChange} type="text" placeholder="Add File" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-3">Type</label>
                    <div className="col-md-9">
                        <select name="projectTypeId" value={request.projectTypeId || ""} onChange={handleChange} className="form-control custom-select"  >
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

export default ModalFormEditProject;