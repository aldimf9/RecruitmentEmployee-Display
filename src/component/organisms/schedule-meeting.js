import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useMutation } from "@tanstack/react-query";
import { doApproval } from "../../services/approvalService";

let ScheduleMeetting = ({ data }) => {
    // useEffect(() => {
    //     console.log(data);
    // },[data])

    // const [reformatDateTime, setReformatDateTime] = useState({
    //     date: "",
    //     time: ""
    // })

    // useEffect(() => {
    //     let datetime = data.interviewDate;
    //     setReformatDateTime({
    //         ...reformatDateTime,
    //         date: dateFormat(datetime,"dddd, d mmmm yyyy"),
    //         time: dateFormat(datetime,"HH:MM TT")
    //     })
    // },[data])

    const [note, setNote] = useState("")

    const [approved] = useState({
        id: data?.id,
        status: "approved",
        note: null,
        userid: data?.candidate,
    });

    const [rejected] = useState({
        id: data?.id,
        status: "rejected",
        note: null,
        userid: data?.candidate,
    });

    const {
        mutate: approval,
        isLoading,
    } = useMutation({
        mutationFn: doApproval
    })

    const handleApprov = (id) => {
        approval({ id, approved })
    }

    const handleReject = (id) => {
        approval({ id, rejected })
    }

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    useEffect(() => {
        console.log(note);
    }, [note])

    return (
        <div className="card-body">
            <h4>Schedule Interview</h4>
            <small className="text-muted">Date</small>
            <h6>{dateFormat(data.interviewDate, "dddd, d mmmm yyyy")}</h6>
            <small className="text-muted">Time</small>
            <h6>{dateFormat(data.interviewDate, "HH:MM TT")}</h6>
            <small className="text-muted p-t-10 db">Location </small>
            <h6>{data.location}</h6>
            <small className="text-muted p-t-10 db">Job</small>
            <h6>{data.jobName}</h6>
            <form>
                <small className="text-muted p-t-10 db">Note</small>
                <textarea value={note} onChange={handleChange} className="form-control" rows="5"></textarea>
            </form>
            <button className="btn btn-rounded btn-success" >APPROVED</button>
            <button className="btn btn-rounded btn-danger" >REJECTED</button>
        </div>
    )
}

export default ScheduleMeetting;