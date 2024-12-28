import background from "../assets/loginBg.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line no-undef
const baseURL = process.env.BACKEND_URL;

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

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

        try {
            const response = await axios.post(
                `${baseURL}/api/signup`,
                {
                    username,
                    password,
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(`Error registering user. ${error}`);
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
                <div className="absolute top-0 left-0 right-0 text-center pt-8 ">
                    <h1 className="text-5xl tracking-widest text-gray-500 font-rajdhani font-extralight">
                        TaskSync
                    </h1>
                    <p className="text-gray-500 tracking-tighter font-majorMono">
                        Organize. Synchronize. Optimize.
                    </p>
                </div>

                <div className="bg-gray-800 bg-opacity-90 text-white flex flex-col rounded-[20px] max-w-md w-full p-8 mt-12 shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-gray-200 font-serif text-center">
                        Signup
                    </h2>

                    <form className="w-full" onSubmit={handleSubmit}>
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
                                required=""
                                onChange={(e) => setUsername(e.target.value)}
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
                                required=""
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
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
                                required=""
                                placeholder="Re-enter password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-500"
                                    checked={acceptTerms}
                                    onChange={(e) =>
                                        setAcceptTerms(e.target.checked)
                                    }
                                    required=""
                                />
                            </div>
                            <label
                                htmlFor="terms"
                                className="ms-2 text-sm font-medium text-gray-300"
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
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                        >
                            Register
                        </button>
                        <div className="text-sm font-medium text-gray-300 text-center mt-5">
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
                        <div className="text-center text-gray-400 mt-4">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Signup;
