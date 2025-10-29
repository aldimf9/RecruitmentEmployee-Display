import { useEffect, useState } from "react";
import { getAllRole } from "../../../services/roleService";
import { useQuery } from "@tanstack/react-query";

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
            <h1>Role</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {role?.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{x.name}</td>
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