import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllRole, getRoleById } from "../../services/roleService";
import { SaveUser } from "../../services/userService";

let ModalEditRoleUser = ({ user, role }) => {
    const [request, setRequest] = useState({
        id: user,
        role: role
    })

    const [roles, setRoles] = useState()

    const [roleById, setRoleById] = useState()

    const {
        data: getRoles,
        isSuccess: getRolesSuccess,
        error: getRoleError
    } = useQuery({
        queryKey: ["roles"],
        queryFn: getAllRole,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 300000
    })
    useEffect(() => {
        if (getRoles?.data != null && getRolesSuccess) {
            setRoles(getRoles?.data)
        }
    }, [getRoles, getRolesSuccess])

    const {
        data: getRoleByIdData,
        isSuccess: getRoleByIdDataSuccess,
        error: getRoleByIdDataError
    } = useQuery({
        queryKey: ["roleById", request.role],
        queryFn: () => getRoleById(request.role),
        enabled: !!request.role,
        staleTime: 0
    })
    useEffect(() => {
        if (getRoleByIdData?.data != null && getRoleByIdDataSuccess) {
            setRoleById(getRoleByIdData?.data)
        }
    }, [getRoleByIdData, getRoleByIdDataSuccess])

    useEffect(() => {
        if (user && role) {
            setRequest({ id: user, role: role })
        }
    }, [user, role])

    const handleChange = (e) => {
        setRequest({
            ...request,
            role: parseInt(e.target.value)
        })
    }

    const {
        mutate: editRoleUser,
        data,
        isLoading,
        isSuccess,
        error
    } = useMutation({
        mutationFn: SaveUser
    })

    const handleSave = () => {
        editRoleUser({ request })
    }

    return (
        <div class="card-body">
            <form action="#" class="form-horizontal form-bordered">
                <div class="form-body">
                    <div class="form-group row">
                        <label class="control-label text-right col-md-3">Role</label>
                        <div class="col-md-9">
                            <div class="form-group has-success">
                                <select class="form-control custom-select" value={roleById?.id} onChange={(e) => handleChange(e)}>
                                    <option value="">-- Pilih Role --</option>
                                    {
                                        roles?.map((x) => (
                                            <option key={x.id} value={x.id}>{x.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="offset-sm-3 col-md-9">
                                    <button type="button" class="btn btn-success waves-effect waves-light" onLoad={isLoading} onClick={handleSave}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default ModalEditRoleUser;