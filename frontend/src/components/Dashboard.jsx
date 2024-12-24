import { useState } from "react";
import background from "../assets/dashboardBg.png";

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [removedTodos, setRemovedTodos] = useState([]);
    const [input, setInput] = useState("");
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState("");

    const handleSubmit = () => {
        if (input.trim()) {
            setTodos((todos) => [
                ...todos,
                { text: input.trim(), id: Math.random().toString(36).slice(2, 11) },
            ]);
            setInput("");
        }
    };

    const removeTodo = (id) => {
        const todoToRemove = todos.find((t) => t.id === id);
        setRemovedTodos((removedTodos) => [...removedTodos, todoToRemove]);
        setTodos((todos) => todos.filter((t) => t.id !== id));
    };

    const restoreTodo = (id) => {
        const todoToRestore = removedTodos.find((t) => t.id === id);
        setTodos((todos) => [...todos, todoToRestore]);
        setRemovedTodos((removedTodos) => removedTodos.filter((t) => t.id !== id));
    };

    const removePermanently = (id) => {
        setRemovedTodos((removedTodos) => removedTodos.filter((t) => t.id !== id));
    };

    const addNote = () => {
        if (noteInput.trim()) {
            setNotes((notes) => [
                ...notes,
                { text: noteInput.trim(), id: Math.random().toString(36).slice(2, 11) },
            ]);
            setNoteInput("");
        }
    };

    const deleteNote = (id) => {
        setNotes((notes) => notes.filter((note) => note.id !== id));
    };

    const editNote = (id, newText) => {
        setNotes((notes) =>
            notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
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
                            className="bg-gray-300 hover:bg-gray-600 bg-opacity-15 text-white text-sm rounded-lg px-6 py-2"
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
                                    {todos.map(({text, id}) => (
                                        <li
                                            className="flex items-center justify-between bg-gray-300 bg-opacity-20 p-3 rounded-lg group"
                                            key={id}
                                        >
                                            <span className="text-white text-sm break-words mr-4">{text}</span>
                                            <button
                                                onClick={() => removeTodo(id)}
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
                            <div
                                className="overflow-y-auto h-[calc(100%-2rem)] scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400">
                                <ul className="space-y-4 pr-2">
                                    {removedTodos.map(({text, id}) => (
                                        <li
                                            className="flex items-center justify-between bg-gray-300 bg-opacity-20 p-3 rounded-lg group"
                                            key={id}
                                        >
                                            <span className="text-white text-sm break-words line-through mr-4">
                                                {text}
                                            </span>
                                            <div
                                                className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button
                                                    onClick={() => restoreTodo(id)}
                                                    className="text-green-500 text-xs"
                                                >
                                                    Restore
                                                </button>
                                                <div className="border-l-2 border-gray-400 h-6"></div>
                                                <button
                                                    onClick={() => removePermanently(id)}
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

                    <div className="mb-4 flex items-center gap-3">
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
                            className="bg-gray-300 hover:bg-gray-600 bg-opacity-15 text-white text-sm rounded-lg px-6 py-2"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar scrollbar-thumb-zinc-500 scrollbar-track-zinc-400">
                        {notes.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10">No notes available.</p>
                        ) : (
                            <ul className="space-y-4 pr-2">
                                {notes.map(({text, id}) => (
                                    <li
                                        key={id}
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
                                                editNote(id, e.target.textContent);
                                            }}
                                        >
                                            {text}
                                        </span>
                                        <button
                                            onClick={() => deleteNote(id)}
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