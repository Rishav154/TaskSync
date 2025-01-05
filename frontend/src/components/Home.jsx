import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import backgroundDesktop from "../assets/homeBg.webp";
import backgroundMobile from "../assets/homeBgMobile.webp";


const ScrollbarStyle = () => (
    <style>
        {`
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      /* Custom background class with media queries */
      .responsive-bg {
        background-image: url(${backgroundMobile});
      }
      
      @media (min-width: 640px) {
        .responsive-bg {
          background-image: url(${backgroundDesktop});
        }
      }
    `}
    </style>
);

function Home() {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollContainerRef = useRef(null);

    const features = [
        {
            title: "Modern and Sleek Design",
            description: "Experience a clean, user-friendly interface crafted for simplicity and elegance."
        },
        {
            title: "Effortless Organization",
            description: "Manage and prioritize your tasks with an intuitive interface designed for simplicity and productivity."
        },
        {
            title: "Real-Time Sync",
            description: "Stay up-to-date with seamless synchronization across all your devices."
        },
        {
            title: "Utmost Security",
            description: "Your data is completely secure with us. All passwords are stored using secure hashing methods to ensure maximum protection."
        },
        {
            title: "Effortless Management",
            description: "Easily mark your tasks as active or completed with just a click."
        },
        {
            title: "Editable Notes",
            description: "Simply double-click on a note to make quick edits effortlessly."
        }
    ];

    const duplicatedFeatures = [...features, ...features];

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const scroll = () => {
            if (!isScrolling) return;
            scrollContainer.scrollLeft += 1;

            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2) {
                scrollContainer.scrollLeft = 0;
            }
        };

        const intervalId = setInterval(scroll, 20);

        return () => clearInterval(intervalId);
    }, [isScrolling]);

    return (
        <div className="text-white min-h-screen">
            <ScrollbarStyle/>

            {/* Hero Section */}
            <header
                className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 responsive-bg bg-cover bg-center bg-no-repeat"
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                {/* Rest of the header content remains the same */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-majorMono tracking-widest text-white z-10 mb-4 animate-fadeIn">
                    TaskSync
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 tracking-widest font-rajdhani z-10 mb-6 animate-fadeIn animation-delay-1 px-4">
                    Organize. Synchronize. Optimize.
                </p>
                <div className="z-10 flex flex-col sm:flex-row gap-4 sm:space-x-4">
                    <Link
                        to="/signup"
                        className="bg-gray-500 bg-transparent border hover:bg-zinc-700 font-majorMono text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-md transform transition-transform hover:scale-105 w-full sm:w-auto"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="bg-transparent border border-gray-300 hover:bg-gray-300 hover:text-gray-900 font-majorMono text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-md transform transition-transform hover:scale-105 w-full sm:w-auto"
                    >
                        Log In
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-12 sm:py-20 bg-zinc-900">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-500 mb-8 sm:mb-16 px-4">
                    Why Choose{" "}
                    <span className="text-white font-majorMono">TaskSync</span>?
                </h2>

                {/* Desktop view */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 max-w-7xl mx-auto px-8">
                    {features.map((feature, index) => (
                        <div key={index}
                             className="bg-zinc-600 p-6 sm:p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="sm:hidden relative overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-scroll hide-scrollbar"
                        onMouseEnter={() => setIsScrolling(true)}
                        onMouseLeave={() => setIsScrolling(false)}
                        onTouchStart={() => setIsScrolling(false)}
                        onTouchEnd={() => setIsScrolling(true)}
                    >
                        <div className="flex gap-4 px-4 py-2">
                            {duplicatedFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-72 bg-zinc-600 p-6 rounded-lg shadow-lg"
                                >
                                    <h3 className="text-xl font-semibold mb-4 text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none"/>
                    <div
                        className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none"/>
                </div>
            </section>

            {/* Rest of the sections remain unchanged */}
            <section className="bg-zinc-800 py-10 sm:py-14 px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 animate-fadeIn">
                    Ready to Get Started?
                </h2>
                <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 animate-fadeIn animation-delay-1">
                    Boost your productivity and take control of your tasks.
                </p>
                <Link
                    to="/signup"
                    className="inline-block bg-gray-800 text-white hover:bg-gray-500 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-custom-dark transform transition-transform hover:scale-105"
                >
                    Join TaskSync Now
                </Link>
            </section>

            <section className="bg-zinc-900 py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-sm sm:text-md text-gray-400 mb-6 sm:mb-8">
                        Whether you have questions, feedback, or just want to say hi (｡♥‿♥｡), I&#39;m here to connect!
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <a
                            href="https://github.com/Rishav154"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center bg-zinc-800 py-4 sm:py-5 px-3 sm:px-4 rounded-lg shadow-lg hover:bg-zinc-700 transition-all"
                        >
                            <GithubIcon size={28} className="text-gray-300 group-hover:text-white mb-2 sm:mb-3"/>
                            <h3 className="text-base sm:text-lg font-medium text-gray-300 group-hover:text-white">
                                GitHub
                            </h3>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/rishav-prasad-1b7b80259/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center bg-zinc-800 py-4 sm:py-5 px-3 sm:px-4 rounded-lg shadow-lg hover:bg-zinc-700 transition-all"
                        >
                            <LinkedinIcon size={28} className="text-blue-500 group-hover:text-white mb-2 sm:mb-3"/>
                            <h3 className="text-base sm:text-lg font-medium text-gray-300 group-hover:text-white">
                                LinkedIn
                            </h3>
                        </a>
                        <a
                            href="mailto:rishav15045@gmail.com"
                            className="group flex flex-col items-center bg-zinc-800 py-4 sm:py-5 px-3 sm:px-4 rounded-lg shadow-lg hover:bg-zinc-700 transition-all"
                        >
                            <Mail size={28} className="text-red-500 group-hover:text-white mb-2 sm:mb-3"/>
                            <h3 className="text-base sm:text-lg font-medium text-gray-300 group-hover:text-white">
                                Email
                            </h3>
                        </a>
                    </div>
                </div>
            </section>

            <footer className="bg-zinc-800 py-3 px-4 text-center">
                <div className="text-gray-400 text-xs sm:text-sm">
                    © {new Date().getFullYear()} TaskSync. All rights reserved.
                </div>
                <div className="mt-2">
                    <Link
                        to="/termsandconditions"
                        className="text-blue-500 hover:underline text-xs sm:text-sm"
                    >
                        Terms and Conditions
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default Home;