let ModalFormEditInterviewSchedule = ({ data }) => {
    return (
        <div>
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
                        <label className="control-label text-right col-md-4">Notes</label>
                        <div className="col-md-6">
                            <textarea className="form-control" type="area" name="notes" placeholder="Notes" />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-rounded btn-success text-white" type="button" data-dismiss="modal" >
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalFormEditInterviewSchedule;