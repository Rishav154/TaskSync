import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import background from "../assets/homeBg.webp";

function Home() {
    return (
        <div
            className="text-white min-h-screen"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Hero Section */}
            <header className="relative flex flex-col items-center justify-center h-screen text-center">
                <div className="absolute inset-0"></div>
                <h1 className="text-7xl font-majorMono tracking-widest text-white z-10 mb-4 animate-fadeIn">
                    TaskSync
                </h1>
                <p className="text-xl text-gray-300 tracking-widest font-rajdhani z-10 mb-6 animate-fadeIn animation-delay-1">
                    Organize. Synchronize. Optimize.
                </p>
                <div className="z-10 space-x-4">
                    <Link
                        to="/signup"
                        className="bg-gray-500 bg-transparent border hover:bg-zinc-700 font-majorMono text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transform transition-transform hover:scale-105"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="bg-transparent border border-gray-300 hover:bg-gray-300 hover:text-gray-900 font-majorMono text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transform transition-transform hover:scale-105"
                    >
                        Log In
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-8 bg-zinc-900">
                <h2 className="text-4xl font-extrabold text-center text-gray-500 mb-16">
                    Why Choose{" "}
                    <span className="text-white font-majorMono">TaskSync</span>?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    <div
                        className="bg-zinc-600 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Modern and Sleek Design
                        </h3>
                        <p className="text-gray-400">
                            Experience a clean, user-friendly interface crafted for simplicity and elegance.
                        </p>
                    </div>
                    <div
                        className="bg-zinc-600 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Effortless Organization
                        </h3>
                        <p className="text-gray-400">
                            Manage and prioritize your tasks with an intuitive
                            interface designed for simplicity and productivity.
                        </p>
                    </div>
                    <div
                        className="bg-zinc-600 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Real-Time Sync
                        </h3>
                        <p className="text-gray-400">
                            Stay up-to-date with seamless synchronization across
                            all your devices.
                        </p>
                    </div>
                    <div
                        className="bg-zinc-600 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Utmost Security
                        </h3>
                        <p className="text-gray-400">
                            Your data is completely secure with us. All passwords are stored using secure hashing
                            methods to ensure maximum protection.
                        </p>
                    </div>
                    <div
                        className="bg-zinc-600 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Effortless Management
                        </h3>
                        <p className="text-gray-400">
                            Easily mark your tasks as active or completed with just a click.
                        </p>
                    </div>
                    <div
                        className="bg-zinc-600 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Editable Notes
                        </h3>
                        <p className="text-gray-400">
                            Simply double-click on a note to make quick edits effortlessly.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-800 py-14 text-center">
                <h2 className="text-4xl font-bold text-white mb-6 animate-fadeIn">
                    Ready to Get Started?
                </h2>
                <p className="text-lg text-gray-200 mb-8 animate-fadeIn animation-delay-1">
                    Boost your productivity and take control of your tasks.
                </p>
                <Link
                    to="/signup"
                    className="bg-gray-800 text-white hover:bg-gray-500 px-10 py-4 rounded-full text-lg font-semibold shadow-custom-dark transform transition-transform hover:scale-105"
                >
                    Join TaskSync Now
                </Link>
            </section>

            {/* Contact Me Section */}
            <section className="bg-zinc-900 py-12 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-md text-gray-400 mb-8">
                        Whether you have questions, feedback, or just want to say hi (｡♥‿♥｡), I'm here to connect!
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <a
                            href="https://github.com/Rishav154"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center bg-zinc-800 py-5 px-4 rounded-lg shadow-lg hover:bg-zinc-700 transition-all"
                        >
                            <GithubIcon size={32} className="text-gray-300 group-hover:text-white mb-3" />
                            <h3 className="text-lg font-medium text-gray-300 group-hover:text-white">
                                GitHub
                            </h3>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/rishav-prasad-1b7b80259/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center bg-zinc-800 py-5 px-4 rounded-lg shadow-lg hover:bg-zinc-700 transition-all"
                        >
                            <LinkedinIcon size={32} className="text-blue-500 group-hover:text-white mb-3" />
                            <h3 className="text-lg font-medium text-gray-300 group-hover:text-white">
                                LinkedIn
                            </h3>
                        </a>
                        <a
                            href="mailto:rishav15045@gmail.com"
                            className="group flex flex-col items-center bg-zinc-800 py-5 px-4 rounded-lg shadow-lg hover:bg-zinc-700 transition-all"
                        >
                            <Mail size={32} className="text-red-500 group-hover:text-white mb-3" />
                            <h3 className="text-lg font-medium text-gray-300 group-hover:text-white">
                                Email
                            </h3>
                        </a>
                    </div>
                </div>
            </section>



            {/* Footer Section */}
            <footer className="bg-zinc-800 py-3 text-center">
                <div className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} TaskSync. All rights reserved.
                </div>
                <div className="mt-2">
                    <Link
                        to="/termsandconditions"
                        className="text-blue-500 hover:underline"
                    >
                        Terms and Conditions
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default Home;

