require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./model/UserModel");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

//CONNECT TO MONGODB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Failed to connect to Database:", err));

//Signup route
app.post("/api/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: "Username already taken" });
        }

        const user = new User({ username, password });
        await user.save();
        res.status(201).send({
            message: "User registered successfully! You can now Log In",
        });
    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });
    }
});

//Login route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).send({ error: "Invalid password" });
        }

        // If authentication is successful
        res.status(200).send({ message: "Login successful", user });
    } catch (error) {
        res.status(500).send({ error: "Server error" });
    }
});

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
