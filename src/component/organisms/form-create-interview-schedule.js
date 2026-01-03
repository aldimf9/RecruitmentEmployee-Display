import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { doApproval } from "../../services/approvalService";
import { getProfile } from "../../services/candidateEmployeeService";
import { InsertInterviewScheduleData } from "../../services/InterviewService";

let ModalFormCreateInterviewSchedule = () => {
    
    const [userApprovalData, setUserApprovalData] = useState({})

    const [formData,setFormData]= useState({
        interviewType : "",
        interviewDate : "",
        location: "",
        interviewer: 0,
        phase:""
    })
    
    const [approved,setApproved] = useState({
        id: 0,
        status: "HAS_BEEN_APPROVED",
        note: null,
        userid: 0,
    });

    const{
        data: userData,
        isSuccess: getUserDataSuccess
    } = useQuery({
        queryKey: ["user-approval"],
        queryFn: () => getProfile(localStorage.getItem("username")),
        enabled: !!localStorage.getItem("username"),
        staleTime: 300000,
        cacheTime: 300000,
        refetchInterval: 300000
    })
    useEffect(() => {
        if (userData?.data != null && getUserDataSuccess) {
            setUserApprovalData(userData.data)
        }
    },[userData,getUserDataSuccess])

    useEffect(() => {
        if(userApprovalData != null){
            setApproved(prev =>({
                ...prev,
                userid: userApprovalData.id
            }))
        }
    },[userApprovalData])
    

    const{
        mutate: approval,
        isLoading : approvalLoading
    } = useMutation({
        mutationFn: doApproval
    })

    const{
        mutate: insertInterview,
        isLoading : scheduleLoading
    } = useMutation({
        mutationFn: InsertInterviewScheduleData
    })

    const handleButton = () =>{
        approval(approved)
        insertInterview()
    }

    return (
        <form action="#" className="form-horizontal form-bordered">
            <div className="form-body">
                <div className="form-group row">
                    <label className="control-label text-right col-md-4">Date</label>
                    <div className="col-md-6">
                        <input name="date" type="datetime-local" placeholder="Date" className="form-cotrol" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-4">Interview Type</label>
                    <div className="col-md-6">
                        <select className="form-control custom-select" name="type">
                            <option value="">-- Pilih Type --</option>
                            <option value="ONLINE">Online</option>
                            <option value="OFFLINE">Offline</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-4">Location</label>
                    <div className="col-md-6">
                        <input name="location" type="text" className="form-control" placeholder="Location" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-4">Interviewer</label>
                    <div className="col-md-6">
                        <select className="form-control custom-select" name="user">
                            <option value="">-- Pilih Interviewer --</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label text-right col-md-4">Note</label>
                    <div className="col-md-6">
                        <textarea className="form-control" type="area" name="notes" placeholder="Note" />
                    </div>
                </div>
                <div>
                    <button onClick={handleButton} className="btn btn-rounded btn-success text-white" type="button" data-dismiss="modal" >
                        SAVE
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ModalFormCreateInterviewSchedule;