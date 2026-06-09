const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Contact Model
const Contact = mongoose.model("Contact", contactSchema);

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Contact Form API
app.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();

        res.status(200).json({
            message: "Message Saved Successfully"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error Saving Message"
        });
    }
});

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server Start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
