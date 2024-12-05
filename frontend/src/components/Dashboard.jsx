import background from "../assets/dashboardBg.png";

function Dashboard() {
    return (
        <div
            className="h-screen flex justify-center items-center"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className=" text-white p-8 flex flex-col items-center">
                <div className="grid grid-cols-3 gap-8 w-full ">
                    {/* Weather Section */}
                    <div className="col-span-1 bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Location</h2>
                        <div className="text-5xl font-bold mt-2">13°</div>
                        <p className="text-sm text-gray-300">Sunny</p>
                        <div className="flex justify-between mt-4 text-sm">
                            <div>9AM</div>
                            <div>10AM</div>
                            <div>11AM</div>
                            <div>3PM</div>
                            <div>5PM</div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                            <div>13°</div>
                            <div>13°</div>
                            <div>14°</div>
                            <div>12°</div>
                            <div>12°</div>
                        </div>
                    </div>

                    {/* Clock Section */}
                    <div className="col-span-1 bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold">16</h2>
                        <p className="text-sm text-gray-300">July, 2040</p>
                        <p className="text-sm text-gray-300 mb-2">Monday</p>
                        <div className="text-6xl font-extrabold">10:00</div>
                    </div>

                    {/* Profile Section */}
                    <div className="col-span-1 bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow-md flex items-center justify-center">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="rounded-lg shadow-md w-32 h-32"
                        />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-lg italic font-light">
                        Some motivating quote here
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-5xl mt-8">
                    {/* Reminder Section */}
                    <div className="col-span-1 bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Reminder</h2>
                        <div className="mt-4 h-32 bg-gray-800 rounded-lg"></div>
                    </div>

                    {/* To-Do List Section */}
                    <div className="col-span-1 bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">To Do List</h2>
                        <div className="mt-4 h-32 bg-gray-800 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
