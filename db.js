const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "ur password",  // Change this to your MySQL password
    database: "chatbot_db"
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed: ", err);
        return;
    }
    console.log("✅ Connected to database");
});

module.exports = db;
