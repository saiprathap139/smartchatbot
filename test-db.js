const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

// 📌 API to save user and bot messages
app.post("/save-message", (req, res) => {
    const { sender, message } = req.body;

    if (!sender || !message) {
        return res.status(400).send("Sender and message are required!");
    }

    const query = "INSERT INTO messages (sender, message) VALUES (?, ?)";
    db.query(query, [sender, message], (err) => {
        if (err) {
            console.error("❌ Error inserting message:", err.sqlMessage);
            return res.status(500).send("Database error: " + err.sqlMessage);
        }
        console.log(`✅ Message saved: ${sender}: ${message}`);
        res.send("Message saved successfully!");
    });
});

// 📌 API to get messages
app.get("/get-messages", (req, res) => {
    db.query("SELECT * FROM messages ORDER BY timestamp ASC", (err, results) => {
        if (err) {
            console.error("❌ Error fetching messages:", err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
