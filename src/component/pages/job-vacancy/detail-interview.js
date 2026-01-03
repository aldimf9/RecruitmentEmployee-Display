import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ViewDetailCandidate from "../candidate-employee/view-detail-candidate";
import ScheduleMeetting from "../../organisms/schedule-meeting";

let PageDetailCandidate = () => {
    const { state } = useLocation();
    const { data, type } = state;
    return (
        <div>
            {type === "INTERVIEW" && (
                <div className="row">
                    <div className="col-lg-4 col-xlg-3 col-md-5">
                        <div className="card">
                            <ScheduleMeetting data={data} />
                        </div>
                    </div>
                    <div className="col-lg-8 col-xlg-9 col-md-7">
                        <div className="card">
                            <div className="card-body">
                                <ViewDetailCandidate username={"joni"} />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            {
                type === "" && (
                    <ViewDetailCandidate username={"joni"} />
                )
            }


        </div >
    )
}

export default PageDetailCandidate;