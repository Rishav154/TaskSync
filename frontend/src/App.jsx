import Signup from "./components/Signup";
import Login from "./components/Login";
import TermsAndCondition from "./components/TermsAndCondition";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/termsandconditions",
            element: <TermsAndCondition />,
        },
        {
            path: "/dashboard",
            element: (<ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
            ),
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}
export default App;
