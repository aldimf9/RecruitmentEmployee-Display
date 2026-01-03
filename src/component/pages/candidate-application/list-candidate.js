import { Link } from "react-router-dom";

let CandidateByApplication = () => {
    return (
        <div>
            <h3 className="text-center">Make an Application</h3>
            <table class="table color-table info-table hover-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Place and Date of Birth</th>
                        <th>Phone Number</th>
                        <th>CV</th>
                        <th>Portofolio</th>
                        <th>Application</th>
                        <th>Phase</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sukijan Wijanarko</td>
                        <td>Madiun / 19-12-2002</td>
                        <td>080088882222</td>
                        <td>link</td>
                        <td>link</td>
                        <td>Junior FullStack Developer</td>
                        <td>
                            Screening CV
                        </td>
                        <td>
                            <button className="btn btn-outder btn-warning">
                                <Link className="text-white" to="/candidate/0">
                                    Detail
                                </Link>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default CandidateByApplication;