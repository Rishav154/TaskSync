import background from "../assets/loginBg.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/login`,
                {
                    username,
                    password,
                }
            );

            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/dashboard");

        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.log(err);
        }
    };

    return (
        <>
            <div
                className="h-screen flex items-center justify-center"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute top-0 left-0 right-0 text-center pt-8">
                    <h1 className="text-5xl tracking-widest text-gray-500 font-rajdhani font-extralight">
                        TaskSync
                    </h1>
                    <p className="text-gray-500 tracking-tighter font-majorMono">
                        Organize. Synchronize. Optimize.
                    </p>
                </div>

                <div className="bg-gray-800 bg-opacity-90 text-white flex flex-col rounded-[20px] max-w-md w-full p-8 mt-12 shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-gray-200 font-serif text-center">
                        Login
                    </h2>

                    <form onSubmit={handleLogin} className="w-full">
                        <div className="mb-5">
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
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-5">
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
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    required=""
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                        >
                            Login
                        </button>
                        <div className="text-sm font-medium text-gray-300 text-center mt-5">
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
                        <div className="text-gray-400 text-center mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;
