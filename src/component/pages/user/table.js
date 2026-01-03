import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUser } from "../../../services/userService";
import ModalEditRoleUser from "../../organisms/form-edit-role-user";

let ListUser = () => {

    const [response, setResponse] = useState()

    const [selectedId, setSelectedId] = useState({
        user: 0,
        role: 0
    })

    const {
        data,
        isSuccess,
        error
    } = useQuery({
        queryKey: ["user"],
        queryFn: getAllUser,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 300000
    })
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setResponse(data.data)
        }
    }, [data, isSuccess])

    return (
        <div>
            <div className="container my-4">
                <div className="row align-items-center">
                    {/* Kolom kiri (kosong untuk jarak kiri) */}
                    <div className="col-md-3"></div>

                    {/* Kolom tengah (judul di tengah) */}
                    <div className="col-md-6 text-center">
                        <h1>USER DATA</h1>
                    </div>

                    {/* Kolom kanan (tombol di kanan) */}
                    <div className="col-md-3 text-right"></div>
                </div>
            </div>
            <table class="table table-striped color-bordered-table info-bordered-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {response?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.username}</td>
                                <td>{x.roleName}</td>
                                <td>
                                    <div id="edit" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="editUser" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title" id="editUser">EDIT ROLE USER</h4>
                                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                </div>
                                                <div className="modal-body"> <ModalEditRoleUser user={selectedId.user} role={selectedId.role} ></ModalEditRoleUser> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() =>  setSelectedId({ user: x.id, role: x.role })} data-toggle="modal" data-target="#edit" className="btn btn-rounded btn-warning">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    <tr>
                        <td>jono</td>
                        <td>candidate</td>
                        <td>
                            <Link to={`/user/1`}>
                                <button className="btn btn-rounded btn-warning">
                                    Edit
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default ListUser;