import background from "../assets/loginBg.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        if (!acceptTerms) {
            setMessage("You must accept the terms and conditions to register.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/signup`,
                {
                    username,
                    password,
                }
            );
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 100);
        } catch (error) {
            setMessage(`Error registering user. ${error}`);
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
                    Signup
                </h2>

                <form className="w-full space-y-4" onSubmit={handleSubmit}>
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
                            required
                            onChange={(e) => setUsername(e.target.value)}
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
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            placeholder="Re-enter password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-500"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                required
                            />
                        </div>
                        <label
                            htmlFor="terms"
                            className="ms-2 text-xs sm:text-sm font-medium text-gray-300"
                        >
                            I agree with the{" "}
                            <Link
                                to="/termsandconditions"
                                className="text-blue-400 hover:underline"
                            >
                                terms and conditions
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-6 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>

                    <div className="text-xs sm:text-sm font-medium text-gray-300 text-center mt-4">
                        <p className="inline">Already have an account? </p>
                        <Link
                            to="/login"
                            className="text-blue-400 hover:underline"
                        >
                            LogIn
                        </Link>
                    </div>
                </form>

                {message && (
                    <div className="text-center text-gray-400 mt-4 text-sm">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;