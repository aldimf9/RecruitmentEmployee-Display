let Home = () => {
    return (

        <div>
            {/* ===== Hero Section ===== */}
            <section
                id="home"
                className="d-flex align-items-center bg-light text-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="container">
                    <h1 className="display-4 font-weight-bold text-primary">
                        Find Your Dream Job
                    </h1>
                    <p className="lead mt-3">
                        Explore thousands of job opportunities that match your skills and passion.
                    </p>
                    {/* <a href="/register" className="btn btn-primary btn-lg mt-4">
                        Get Started
                    </a> */}
                </div>
            </section>

            {/* ===== About Section ===== */}
            <section id="about" className="py-5">
                <div className="container text-center">
                    <h2 className="mb-4">About RecruitEase</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                        RecruitEase is a web-based recruitment platform designed to simplify
                        the hiring process for companies and job seekers. From application
                        tracking to interview scheduling, we make recruitment easier and faster.
                    </p>
                </div>
            </section>

            {/* ===== Features Section ===== */}
            <section id="features" className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-5">Why Choose Us</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <i className="fa fa-briefcase fa-3x text-primary mb-3"></i>
                            <h5>Easy Job Search</h5>
                            <p>
                                Find jobs that match your skills with our advanced search system.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <i className="fa fa-building fa-3x text-primary mb-3"></i>
                            <h5>For Employers</h5>
                            <p>
                                Manage job postings, view candidates, and streamline your recruitment
                                process.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <i className="fa fa-user-check fa-3x text-primary mb-3"></i>
                            <h5>Verified Profiles</h5>
                            <p>
                                We ensure job seekers and employers are verified for safer recruitment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;