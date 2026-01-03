// let Table = (props) => {
//     let data = props.data.data
//     console.log(data);
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { getAllUserData } from "../../../services/candidateEmployeeService";

//     return (
//         <>
//             <h1>Candidate Employee</h1>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.filter(x => x.isDeleted === false).map(x => {
//                         return (
//                             <tr>
//                                 <td>{x.id}</td>
//                                 <td>{x.name}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table >
//         </>
//     )
// }

let TableListCandidateEmployee = () => {
    // State
    const [userData,setUserData] = useState([])

    const navigate = useNavigate()

    const{
        data: getUserData,
        isLoading : getLoadingUserData,
        isSuccess: getUserDataSuccess
    } = useQuery({
        queryKey:["user-data"],
        queryFn: getAllUserData,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval:300000
    })
    useEffect(() => {
        if (getUserData?.data !== null && getUserDataSuccess) {
            setUserData(getUserData.data);
        }
    },[getUserData,getUserDataSuccess])

    // useEffect(() => {
    //     console.log(userData);
    // },[userData])

    const handleDetail = (data) =>{
        navigate("/profile" , {state: {username : data , action : ""}});
    }

    if (getLoadingUserData) {
        return(
            <p>Loading Data...</p>
        )
    }

    return (
        <div>
            <div className="container my-4">
                <h1 className="text-center">List of Candidates</h1>
            </div>
            <table className="table table-striped color-bordered-table info-bordered-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Place and Date of Birth</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.map((x) => (
                        <tr key={x.id}>
                            <td>{x.firstName} {x.lastName}</td>
                            <td>{x.city_date} / {x.birth_date}</td>
                            <td>{x.phoneNumber}</td>
                            <td>
                            <button onClick={() => handleDetail(x.username)} className="btn btn-rounded btn-info">
                                    Detail
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div>
    )
}

export default TableListCandidateEmployee;