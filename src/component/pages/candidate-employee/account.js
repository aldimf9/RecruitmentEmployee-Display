import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SaveUser } from "../../../services/userService";
import { getProfile } from "../../../services/candidateEmployeeService";

let SetAccount = () => {

    const [request, setRequest] = useState({
        id: 0,
        username: "",
        password: ""
    })

    const [requestByUsername, setRequestByUsername] = useState({
        username: localStorage.getItem("username")
    })

    const [showPassword, setShowPassword] = useState(false)

    // GET Id for form
    const {
        data: getIdData,
        isLoading: idDataIsLoading,
        error: idDataError,
        isSuccess: getIdDataSuccess
    } = useQuery({
        queryKey: ["user-byId"],
        queryFn: () => getProfile(requestByUsername),
        enabled: !!requestByUsername.username,
        staleTime: 300000,
        cacheTime: 300000
    })
    useEffect(() => {
        if (getIdData?.data != null && getIdDataSuccess) {
            setRequest({
                id: getIdData.data.id,
                username: requestByUsername.username,
                password: ""
            })
        }
    }, [getIdData, getIdDataSuccess])

    let handleInput = (e) => {
        setRequest({
            ...request,
            [e.target.name]: e.target.value
        })
    }

    const {
        mutate: editAccount,
        isLoading
    } = useMutation({
        mutationFn: SaveUser,
        onSuccess: () => {
            window.location.reload();
        }
    });


    const handleSave = () => {
        editAccount(request);
    }

    return (
        <div className="card-body">
            <h1 className="text-center">Account Setting</h1>
            <form action="#" className="form-horizontal form-bordered">
                <div className="form-body">
                    <div className="form-group row">
                        <label className="control-label text-right col-md-3">Username</label>
                        <div className="col-md-9">
                            <input name="username" onChange={(e) => handleInput(e)} value={request?.username} type="text" placeholder="Username" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="control-label text-right col-md-3">Password</label>
                        <div className="col-md-9">
                            <input name="password" onChange={(e) => handleInput(e)} value={request?.password} type={showPassword ? "text" : "password"} placeholder="Password" className="form-control" />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword((s) => !s)}>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="offset-sm-3 col-md-9">
                                    <button  type="button" onClick={() => handleSave()} className="btn btn-success">
                                        {isLoading ? "Saving..." : "Save"}
                                    </button>
                                    <Link className="btn btn-inverse text-white" to={"/home"}>
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SetAccount;