import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
        return <Navigate to="/login" />; // Redirect to log in if no token
    }

    return children; // Render the protected component if token exists
}

// Add prop types for validation
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
