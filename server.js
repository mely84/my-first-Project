
const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");

const db = new Database("registrations.db");


db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT NOT NULL,
        language TEXT NOT NULL
    )
`);
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "portal.html"));
});


app.post("/register", (req, res) => {
    const { firstname, lastname, email, language } = req.body;

    const stmt = db.prepare(`
        INSERT INTO registrations
        (firstname, lastname, email, language)
        VALUES (?, ?, ?, ?)
    `);

    stmt.run(firstname, lastname, email, language);

    res.send(`
        <h1>ثبت‌نام با موفقیت ذخیره شد!</h1>
        <p>نام: ${firstname}</p>
        <p>نام خانوادگی: ${lastname}</p>
        <p>ایمیل: ${email}</p>
        <p>زبان: ${language}</p>
        <a href="/">بازگشت به فرم</a>
    `);
});




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
