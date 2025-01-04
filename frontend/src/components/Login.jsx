import background from "../assets/loginBg.webp";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const BackendBaseURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setError("");

        try {
            if (!BackendBaseURL) {
                throw new Error("API URL not configured");
            }

            const response = await axios.post(
                `${BackendBaseURL}/api/login`,
                {
                    username,
                    password,
                }
            );

            if (!response.data?.token) {
                throw new Error("Invalid response from server");
            }

            const { token } = response.data;

            localStorage.removeItem("token");
            sessionStorage.removeItem("token");

            if (rememberMe) {
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
            } else {
                sessionStorage.setItem("token", token);
            }

            navigate("/dashboard", { replace: true });

        } catch (err) {
            console.error("Login error:", err);

            let errorMessage = "Login failed. Please try again.";

            if (err.message === "API URL not configured") {
                errorMessage = "Server configuration error. Please contact support.";
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full text-center mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl tracking-widest text-gray-500 font-rajdhani font-extralight">
                    TaskSync
                </h1>
                <p className="text-sm sm:text-base text-gray-500 tracking-tighter font-majorMono">
                    Organize. Synchronize. Optimize.
                </p>
            </div>

            <div className="bg-gray-800 bg-opacity-90 text-white rounded-[20px] w-full max-w-[90%] sm:max-w-md p-6 sm:p-8 shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200 font-serif text-center">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-500"
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ms-2 text-xs sm:text-sm font-medium text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-6 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="text-xs sm:text-sm font-medium text-gray-300 text-center mt-4">
                        <p className="inline">
                            Don&apos;t have an account?{" "}
                        </p>
                        <Link
                            to="/signup"
                            className="text-blue-400 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </form>

                {error && (
                    <div className="text-red-400 text-center mt-4 text-sm">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;