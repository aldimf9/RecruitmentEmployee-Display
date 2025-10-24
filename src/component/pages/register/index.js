let Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <div>
                    <label>First Name</label>
                    <input placeholder="Enter your First Name"></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input placeholder="Enter your Last Name"></input>
                </div>
                <div>
                    <label>Address</label>
                    <input placeholder="Enter your Domisile Address"></input>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input placeholder="Enter your Phone Number(Example : 080000000000)"></input>
                </div>
                <div>
                    <label >Birth Date</label>
                    <input type="datetime-local"></input>
                </div>
                <div>
                    <label>City Date</label>
                    <input type="datetime-local"></input>
                </div>
                <div>
                    <label>CV</label>
                    <input placeholder="Enter your Link Curriculum Vitae"></input>
                </div>
                <div>
                    <label>Portofolio</label>
                    <input placeholder="Enter your Link Portofolio"></input>
                </div>
                <div>
                    <label>Username</label>
                    <input placeholder="Enter your New Username"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input placeholder="Enter your New Password"></input>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register