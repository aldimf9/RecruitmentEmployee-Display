import { Navigate } from "react-router-dom";

let PrivateRoute = ({element}) => {
    const jwt = localStorage.getItem("token");
    return jwt !== null ? element: <Navigate to="/signin"/>;
}

export default PrivateRoute;