import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />; // Redirect to log in if no token
    }

    return children; // Render the protected component if token exists
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;



