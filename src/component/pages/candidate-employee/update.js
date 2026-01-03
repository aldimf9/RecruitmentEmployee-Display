import { Link } from "react-router-dom";

let UpdateProfile = () => {
    return (
        <div>
            <div class="card-body">
                <form action="#" class="form-horizontal form-bordered">
                    <div class="form-body">
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">First Name</label>
                            <div class="col-md-9">
                                <input type="text" placeholder="First Name" class="form-control" />
                                {/* <small class="form-control-feedback"> This is inline help </small> */}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">Last Name</label>
                            <div class="col-md-9">
                                <input type="text" placeholder="Last Name" class="form-control" />
                                {/* <small class="form-control-feedback"> This is inline help </small> */}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">Address</label>
                            <div class="col-md-9">
                                <input type="text" placeholder="Address" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">Date of Birth</label>
                            <div class="col-md-9">
                                <input type="date" class="form-control" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">City of Birth</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" placeholder="City" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">Curiculum VitaeV</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" placeholder="CV" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label text-right col-md-3">Portofolio</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" placeholder="Portofolio" />
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="offset-sm-3 col-md-9">
                                        <button type="submit" class="btn btn-success">Save</button>
                                        <button type="button" class="btn btn-inverse" ><Link className="text-white" to={"/profile"}>Cancel</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;