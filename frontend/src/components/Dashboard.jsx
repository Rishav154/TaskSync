import { useState } from "react";
import { useEffect } from 'react';
import axios from 'axios';
import background from "../assets/dashboardBg.png";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [removedTodos, setRemovedTodos] = useState([]);
    const [input, setInput] = useState("");
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState("");

    // Fetch data on load
    useEffect(() => {
        const fetchTodosAndNotes = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: token };

                const [todosResponse, notesResponse] = await Promise.all([
                    axios.get(`${baseURL}/api/todos`, { headers }),
                    axios.get(`${baseURL}/api/notes`, { headers }),
                ]);

                setTodos(todosResponse.data.active);
                setRemovedTodos(todosResponse.data.completed);
                setNotes(notesResponse.data);
            } catch (error) {
                console.error("Failed to fetch todos/notes", error);
            }
        };

        fetchTodosAndNotes();
    }, []);

    const handleSubmit = async () => {
        if (input.trim()) {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: token };

                const response = await axios.post(
                    `${baseURL}/api/todos`,
                    { text: input.trim() },
                    { headers }
                );

                setTodos((todos) => [...todos, response.data]);
                setInput("");
            } catch (error) {
                console.error("Failed to create todo", error);
            }
        }
    };

    const removeTodo = async (_id) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: token };

            const todoToRemove = todos.find((t) => t._id === _id);
            if (!todoToRemove) {
                console.error("Todo not found");
                return;
            }

            const response = await axios.put(
                `${baseURL}/api/todos/${_id}/complete`,
                {},
                { headers }
            );

            setTodos((todos) => todos.filter((t) => t._id !== _id));
            setRemovedTodos((removedTodos) => [...removedTodos, response.data]);
        } catch (error) {
            console.error("Failed to complete todo", error);
        }
    };



    const restoreTodo = async (_id) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: token };

            const response = await axios.put(
                `${baseURL}/api/todos/${_id}/restore`,
                {},
                { headers }
            );

            setTodos((todos) => [...todos, response.data]);
            setRemovedTodos((removedTodos) => removedTodos.filter((t) => t._id !== _id));
        } catch (error) {
            console.error("Failed to restore todo", error);
            alert("Failed to restore todo. Please try again.");
        }
    };

    const removePermanently = async (_id) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: token };

            await axios.delete(`${baseURL}/api/todos/${_id}`, { headers });
            setRemovedTodos((removedTodos) => removedTodos.filter((t) => t._id !== _id));
        } catch (error) {
            console.error("Failed to permanently remove todo", error);
        }
    };


    const addNote = async () => {
        if (noteInput.trim()) {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: token };

                const response = await axios.post(
                    `${baseURL}/api/notes`,
                    { text: noteInput.trim() },
                    { headers }
                );

                setNotes((notes) => [...notes, response.data]);
                setNoteInput("");
            } catch (error) {
                console.error("Failed to create note", error);
            }
        }
    };

    const deleteNote = async (_id) => {  // Changed parameter to _id
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: token };

            await axios.delete(`${baseURL}/api/notes/${_id}`, { headers });  // Changed to _id

            setNotes(notes => notes.filter(note => note._id !== _id));  // Changed to _id
        } catch (error) {
            console.error("Failed to delete note", error);
            alert("Failed to delete note. Please try again.");
        }
    };

    const editNote = (_id, newText) => {  // Changed parameter to _id
        setNotes((notes) =>
            notes.map((note) => (note._id === _id ? { ...note, text: newText } : note))  // Changed to _id
        );
    };

    return (
        <div className="h-screen flex justify-center items-center"
             style={{
                 backgroundImage: `url(${background})`,
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
             }}>
            <div className="grid grid-cols-1 md:grid-cols-3 h-screen w-screen gap-6 p-6">
                <div
                    className="col-span-2 bg-zinc-600 bg-opacity-20 backdrop-blur-md rounded-lg p-6 border border-zinc-500">
                    <h1 className="text-2xl text-white text-center font-majorMono underline underline-offset-[10px] mb-4">
                        To-Do List
                    </h1>

                    {/* Input Section */}
                    <div className="mb-10 mt-10 flex items-center gap-3">
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

                    <div className="flex space-x-6 h-[calc(100vh-300px)]">
                        {/* Active To-Do List */}
                        <div className="flex-1">
                            <h2 className="text-xl text-white font-majorMono mb-4">Active Tasks</h2>
                            <div
                                className="overflow-y-auto h-[calc(100%-2rem)] scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400">
                                <ul className="space-y-4 pr-2">
                                    {todos.map(({text, _id}) => (
                                        <li
                                            className="flex items-center justify-between bg-gray-300 bg-opacity-20 p-3 rounded-lg group"
                                            key={_id}
                                        >
                                            <span className="text-white text-sm break-words mr-4">{text}</span>
                                            <button
                                                onClick={() => removeTodo(_id)}
                                                className="text-gray-300 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs"
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

                        {/* Separator Line */}
                        <div className="px-2">
                            <div className="border-l-2 border-gray-400 h-full"></div>
                        </div>

                        {/* Removed To-Do List */}
                        <div className="flex-1">
                            <h2 className="text-xl text-white font-majorMono mb-4">Completed Tasks</h2>
                            <div className="overflow-y-auto h-[calc(100%-2rem)] scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400">
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
                                                className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                                    Remove Permanently
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

                    <div className="mb-12 mt-6 flex items-center gap-3">
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

                    <div className="overflow-y-auto scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400 h-[580px]">
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
                                            onBlur={(e) => {
                                                e.target.contentEditable = false;
                                                editNote(_id, e.target.textContent);
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
    );
}

export default Dashboard;