require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./model/UserModel");
const mongoose = require("mongoose");
const Todo = require('./model/TodoModel');
const Note = require('./model/NotesModel');
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors({
    origin: [
        'https://task-sync-frontend-omega.vercel.app',
        'http://localhost:5173' // For local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// CONNECT TO MONGODB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Failed to connect to Database:", err));

// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).send({ error: "Access Denied" });
    }

    try {
        // Remove 'Bearer ' from the header to get just the token
        const token = authHeader.replace('Bearer ', '');
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).send({ error: "Invalid Token" });
    }
};


// Signup Route
app.post("/api/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: "User registered successfully! You can now Log In" });
    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });
    }
});

// Login Route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).send({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ error: "Server error" });
    }
});

// Dashboard Route
app.get("/api/dashboard", verifyToken, async (req, res) => {
    try {
        res.status(200).send({ message: "Welcome to the dashboard", user: req.user });
    } catch (error) {
        res.status(500).send({ error: "Server error" });
    }
});

// Get all todos for a user
app.get('/api/todos', verifyToken, async (req, res) => {
    try {
        const activeTodos = await Todo.find({ userId: req.user.id, status: 'active' });
        const completedTodos = await Todo.find({ userId: req.user.id, status: 'completed' });
        res.status(200).send({ active: activeTodos, completed: completedTodos });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch todos" });
    }
});


// Create a new _todo
app.post('/api/todos', verifyToken, async (req, res) => {
    const { text } = req.body;
    try {
        const todo = new Todo({ text, userId: req.user.id });
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(500).send({ error: "Failed to create todo" });
    }
});

// Delete a _todo
app.put('/api/todos/:id/complete', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        );
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ error: "Failed to update todo" });
    }
});

// Delete a _todo permanently
app.delete('/api/todos/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).send({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete todo" });
    }
});

//restore a _todo
app.put('/api/todos/:id/restore', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { status: 'active' },
            { new: true }
        );
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ error: "Failed to restore todo" });
    }
});

// Restore a todo
app.post('/api/todos/restore', verifyToken, async (req, res) => {
    const { todo } = req.body;
    try {
        const restoredTodo = new Todo({
            text: todo.text,
            userId: req.user.id
        });
        await restoredTodo.save();
        res.status(201).send(restoredTodo);
    } catch (error) {
        res.status(500).send({ error: "Failed to restore todo" });
    }
});

// Similar endpoints for Notes
app.get('/api/notes', verifyToken, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch notes" });
    }
});

app.post('/api/notes', verifyToken, async (req, res) => {
    const { text } = req.body;
    try {
        const note = new Note({ text, userId: req.user.id });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(500).send({ error: "Failed to create note" });
    }
});

app.put('/api/notes/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { text },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).send({ error: "Note not found" });
        }
        res.status(200).send(updatedNote);
    } catch (error) {
        res.status(500).send({ error: "Failed to update note" });
    }
});

app.delete('/api/notes/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.status(200).send({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete note" });
    }
});

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});