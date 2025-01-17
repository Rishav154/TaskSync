import { useState, useEffect } from "react";
import axios from 'axios';
import background from "../assets/dashboardBg.webp";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [removedTodos, setRemovedTodos] = useState([]);
    const [input, setInput] = useState("");
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState("");
    const [noteInput, setNoteInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("active");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
    const navigate = useNavigate();

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : null
            }
        };
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        let isMounted = true;

        const fetchTodosAndNotes = async () => {
            const MAX_RETRIES = 3;

            const fetchWithRetry = async (url, retries = MAX_RETRIES) => {
                try {
                    return await axios.get(url, getAuthHeaders());
                } catch (error) {
                    if (retries > 0) {
                        return fetchWithRetry(url, retries - 1);
                    }
                    throw error;
                }
            };

            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                if (!token) {
                    navigate("/login", { replace: true });
                    return;
                }

                const [todosResponse, notesResponse, userResponse] = await Promise.all([
                    fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/todos`),
                    fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/notes`),
                    fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/user`),
                ]);

                if (isMounted) {
                    setTodos(todosResponse.data.active);
                    setRemovedTodos(todosResponse.data.completed);
                    setNotes(notesResponse.data);
                    setUsername(userResponse.data.username);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Failed to fetch todos/notes", error);
                    setError("Failed to load data");
                    setIsLoading(false);

                    if (error.response?.status === 401) {
                        localStorage.removeItem("token");
                        sessionStorage.removeItem("token");
                        navigate("/login", { replace: true });
                    }
                }
            }
        };

        fetchTodosAndNotes();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="text-black">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="text-white">{error}</div>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (input.trim()) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/todos`,
                    { text: input.trim() },
                    getAuthHeaders()
                );

                setTodos((todos) => [...todos, response.data]);
                setInput("");
            } catch (error) {
                console.error("Failed to create todo", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                }
            }
        }
    };

    const removeTodo = async (_id) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/todos/${_id}/complete`,
                {},
                getAuthHeaders()
            );

            setTodos((todos) => todos.filter((t) => t._id !== _id));
            setRemovedTodos((removedTodos) => [...removedTodos, response.data]);
        } catch (error) {
            console.error("Failed to complete todo", error);
        }
    };

    const restoreTodo = async (_id) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/todos/${_id}/restore`,
                {},
                getAuthHeaders()
            );

            setTodos((todos) => [...todos, response.data]);
            setRemovedTodos((removedTodos) => removedTodos.filter((t) => t._id !== _id));
        } catch (error) {
            console.error("Failed to restore todo", error);
        }
    };

    const removePermanently = async (_id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/todos/${_id}`,
                getAuthHeaders()
            );
            setRemovedTodos((removedTodos) => removedTodos.filter((t) => t._id !== _id));
        } catch (error) {
            console.error("Failed to permanently remove todo", error);
        }
    };

    const addNote = async () => {
        if (noteInput.trim()) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/notes`,
                    { text: noteInput.trim() },
                    getAuthHeaders()
                );

                setNotes((notes) => [...notes, response.data]);
                setNoteInput("");
            } catch (error) {
                console.error("Failed to create note", error);
            }
        }
    };

    const deleteNote = async (_id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/notes/${_id}`,
                getAuthHeaders()
            );
            setNotes(notes => notes.filter(note => note._id !== _id));
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    const editNote = async (_id, newText) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/notes/${_id}`,
                { text: newText },
                getAuthHeaders()
            );

            setNotes((notes) =>
                notes.map((note) => (note._id === _id ? response.data : note))
            );
        } catch (error) {
            console.error("Failed to update note", error);
        }
    };

    return (
        <>
            <div className="min-h-screen" style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
                <div className="pt-4">
                    {/* Navbar */}
                    <div
                        className="bg-zinc-800 bg-opacity-75 py-2 px-6 flex justify-between items-center rounded-lg p-6 border border-zinc-500 mx-6 relative">
                        <div className="text-white text-lg font-bold font-majorMono">Hello {username} !</div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white"
                        >
                            {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8 font-majorMono">
                            <button
                                onClick={() => navigate("/")}
                                className="text-gray-300 hover:text-white text-sm"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-gray-300 hover:text-white text-sm"
                            >
                                Switch Account
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-red-500 text-sm"
                            >
                                Logout
                            </button>
                        </div>
                        {isMenuOpen && (
                            <div
                                className="absolute right-0 top-full mt-2 w-48 bg-zinc-800 bg-opacity-90 backdrop-blur-md rounded-lg border border-zinc-500 shadow-lg py-2 md:hidden z-50">
                                <button
                                    onClick={() => {
                                        navigate("/");
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-zinc-700 hover:text-white text-sm font-majorMono"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/signup");
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-zinc-700 hover:text-white text-sm font-majorMono"
                                >
                                    Switch Account
                                </button>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-zinc-700 hover:text-red-500 text-sm font-majorMono"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center items-start">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-screen gap-6 p-6 pt-4">
                        <div
                            className="md:col-span-2 bg-zinc-600 bg-opacity-20 backdrop-blur-md rounded-lg p-6 border border-zinc-500">
                            <h1 className="text-2xl text-white text-center font-majorMono underline underline-offset-[10px] mb-4">
                                To-Do List
                            </h1>

                            {/* Input Section */}
                            <div className="mb-6 mt-6 flex items-center gap-3">
                                <input
                                    type="text"
                                    id="todo-element"
                                    className="flex-1 bg-gray-300 bg-opacity-15 text-gray-300 text-sm rounded-lg p-2 w-full sm:w-auto"
                                    placeholder="New todo"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gray-300 hover:bg-zinc-600 bg-opacity-15 text-white text-sm rounded-lg px-6 py-2"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Mobile Tabs */}
                            <div className="md:hidden flex mb-4">
                                <button
                                    onClick={() => setActiveTab("active")}
                                    className={`flex-1 py-2 text-white text-sm font-majorMono ${
                                        activeTab === "active"
                                            ? "border-b-2 border-white"
                                            : "border-b border-gray-500"
                                    }`}
                                >
                                    Active Tasks
                                </button>
                                <button
                                    onClick={() => setActiveTab("completed")}
                                    className={`flex-1 py-2 text-white text-sm font-majorMono ${
                                        activeTab === "completed"
                                            ? "border-b-2 border-white"
                                            : "border-b border-gray-500"
                                    }`}
                                >
                                    Completed Tasks
                                </button>
                            </div>


                            <div className="flex space-x-6 md:space-x-6 min-h-[400px]">
                                {/* Active To-Do List */}
                                <div className={`flex-1 ${activeTab === "active" || window.innerWidth >= 768 ? "block" : "hidden md:block"}`}>
                                    <h2 className="text-xl text-white font-majorMono mb-4 hidden md:block">Active Tasks</h2>
                                    <div className="overflow-y-auto min-h-[300px] scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400">
                                        <ul className="space-y-4 pr-2">
                                            {todos.map(({text, _id}) => (
                                                <li
                                                    className="flex items-center justify-between bg-gray-300 bg-opacity-20 p-3 rounded-lg group"
                                                    key={_id}
                                                >
                                                    <span className="text-white text-sm break-words mr-4">{text}</span>
                                                    <button
                                                        onClick={() => removeTodo(_id)}
                                                        className="text-gray-300 hover:text-red-500 font-bold md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        {todos.length === 0 && (
                                            <p className="text-gray-400 text-center mt-10">
                                                No active tasks yet. Add a new task to get started!
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop Separator Line */}
                                <div className="hidden md:block px-2">
                                <div className="border-l-2 border-gray-400 h-full"></div>
                                </div>

                                {/* Completed To-Do List */}
                                <div className={`flex-1 ${activeTab === "completed" || window.innerWidth >= 768 ? "block" : "hidden md:block"}`}>
                                    <h2 className="text-xl text-white font-majorMono mb-4 hidden md:block">Completed Tasks</h2>
                                    <div className="overflow-y-auto min-h-[300px] scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400">
                                        <ul className="space-y-4 pr-2">
                                            {removedTodos.map(({text, _id}) => (
                                                <li
                                                    className="flex items-center justify-between bg-gray-300 bg-opacity-20 p-3 rounded-lg group"
                                                    key={_id}
                                                >
                                                <span className="text-white text-sm break-words line-through mr-4">
                                                    {text}
                                                </span>
                                                    <div
                                                        className="flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button
                                                            onClick={() => restoreTodo(_id)}
                                                            className="text-green-500 text-xs"
                                                        >
                                                            Restore
                                                        </button>
                                                        <div className="border-l-2 border-gray-400 h-6"></div>
                                                        <button
                                                            onClick={() => removePermanently(_id)}
                                                            className="text-red-500 text-xs"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        {removedTodos.length === 0 && (
                                            <p className="text-gray-400 text-center mt-10">
                                                No removed tasks yet.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div
                            className="bg-zinc-600 bg-opacity-20 backdrop-blur-md rounded-lg p-6 border border-zinc-500 flex flex-col">
                            <h1 className="text-2xl text-white text-center font-majorMono underline underline-offset-[10px] mb-4">
                                Notes
                            </h1>

                            <div className="mb-12 mt-2 flex items-center gap-3">
                                <input
                                    type="text"
                                    id="note-element"
                                    className="flex-1 bg-gray-300 bg-opacity-15 text-gray-300 text-sm rounded-lg p-2 w-full"
                                    placeholder="Write a new note..."
                                    value={noteInput}
                                    onChange={(e) => setNoteInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                                />
                                <button
                                    onClick={addNote}
                                    className="bg-gray-300 hover:bg-zinc-600 bg-opacity-15 text-white text-sm rounded-lg px-6 py-2"
                                >
                                    Add
                                </button>
                            </div>

                            <div
                                className="overflow-y-auto scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400"
                                style={{height: 'calc(100vh - 365px)'}}>
                                {notes.length === 0 ? (
                                    <p className="text-gray-400 text-center mt-20">No notes available.</p>
                                ) : (
                                    <ul className="space-y-4 pr-2">
                                        {notes.map(({text, _id}) => (
                                            <li
                                                key={_id}
                                                className="flex items-center justify-between bg-gray-300 bg-opacity-20 p-3 rounded-lg group"
                                            >
                                            <span
                                                className="text-white text-sm break-words mr-4 cursor-pointer"
                                                contentEditable={false}
                                                onDoubleClick={(e) => {
                                                    e.target.contentEditable = true;
                                                    e.target.focus();
                                                }}
                                                onBlur={async (e) => {
                                                    e.target.contentEditable = false;
                                                    if (e.target.textContent !== text) {
                                                        await editNote(_id, e.target.textContent);
                                                    }
                                                }}
                                            >
                                                {text}
                                            </span>
                                                <button
                                                    onClick={() => deleteNote(_id)}
                                                    className="text-gray-300 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;