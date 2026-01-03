import { useEffect, useState } from "react";
import { getAllRole } from "../../../services/roleService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

let TableRole = () => {
    const [role, setRole] = useState([{}]);
    const { data, isSuccess, isLoading, isError, error, isFetching } =
        useQuery({
            queryKey: ["roles"],
            queryFn: getAllRole,
            enabled: true,
            staleTime: 300000,
            cacheTime: 300000,
            refetchInterval: 30000000
        });
    useEffect(() => {
        if (data?.data != null && isSuccess) {
            setRole(data?.data);
        }
    }, [data, isSuccess])
    if (isLoading) return <p>Loading</p>
    if (isFetching) return <p>Fetching</p>
    return (
        <div>
            <div className="container my-4">
                <div className="row align-items-center">
                    {/* Kolom kiri (kosong untuk jarak kiri) */}
                    <div className="col-md-3"></div>

                    {/* Kolom tengah (judul di tengah) */}
                    <div className="col-md-6 text-center">
                        <h1>ROLE DATA</h1>
                    </div>

                    {/* Kolom kanan (tombol di kanan) */}
                    <div className="col-md-3 text-right">
                        <Link to={"/role/0"} className="btn btn-success btn-rounded text-white">
                            ADD
                        </Link>
                    </div>
                </div>
            </div>
            <table class="table table-striped color-bordered-table info-bordered-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {role?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.name}</td>
                                <td>
                                    <button className="btn btn-rounded btn-warning">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table >
        </div>
    )
}

export default TableRole;