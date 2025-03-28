const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

// 📌 API to save messages
app.post("/save-message", (req, res) => {
    const { sender, message } = req.body;
    if (!sender || !message) {
        return res.status(400).json({ error: "Sender and message are required!" });
    }

    const query = "INSERT INTO messages (sender, message) VALUES (?, ?)";
    db.query(query, [sender, message], (err) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        console.log(`✅ Message saved: ${sender}: ${message}`);
        res.json({ success: true });
    });
});

// 📌 API to get messages
app.get("/get-messages", (req, res) => {
    db.query("SELECT * FROM messages ORDER BY timestamp ASC", (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

const PORT = 5501;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
