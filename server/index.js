require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("The System is Set and Ready to Serve");
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// **Check Subscription Status**
app.post('/check-status', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required", isSubscribed: false });
    }

    let checkSql = "SELECT * FROM student WHERE email = ?";
    con.query(checkSql, [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", isSubscribed: false });
        }
        res.status(200).json({ isSubscribed: results.length > 0 });
    });
});

// **Subscribe Route**
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    let checkSql = "SELECT * FROM student WHERE email = ?";
    con.query(checkSql, [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email is already subscribed!" });
        }

        let insertSql = "INSERT INTO student (email) VALUES (?)";
        con.query(insertSql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Database error" });
            }

            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Email Subscription System',
                text: "Thank you for subscribing 🎉 We're thrilled to have you as part of our community." +
                    "\n\nIf you have any questions or suggestions, feel free to reach out." +
                    "\n\nStay connected,\n\nEmail Subscription System"
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log("Error occurred: ", err);
                    return res.status(500).json({ message: "Failed to send email" });
                }
                return res.status(200).json({ message: "You have successfully subscribed. Check your mailbox!" });
            });
        });
    });
});

// **Unsubscribe Route**
app.delete('/unsubscribe', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    let sql = "DELETE FROM student WHERE email = ?";
    con.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Email not found in the subscription list!" });
        }

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Subscription System',
            text: "You have successfully unsubscribed. If you change your mind, you're always welcome to resubscribe anytime."
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error occurred: ", err);
                return res.status(500).json({ message: "Failed to send email" });
            }
            return res.status(200).json({ message: "🛑 You’ve Been Unsubscribed. Check your mailbox!" });
        });
    });
});

app.listen(9000, () => {
    console.log("Listening at port 9000");
});
