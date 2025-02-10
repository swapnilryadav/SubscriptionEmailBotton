# SubscriptionEmailButton
A full-stack email subscription system built with React.js for the frontend and Node.js (Express) for the backend. This project allows users to subscribe and unsubscribe from an email list, storing their data in a MySQL database and sending confirmation emails using Nodemailer.

📌 Features
✅ Email Subscription – Users can enter their email and subscribe.
✅ Email Unsubscription – Users can unsubscribe from the mailing list.
✅ Database Storage – Subscribed emails are stored in a MySQL database.
✅ Subscription Confirmation Emails – Users receive a welcome email upon subscription.
✅ Unsubscription Confirmation Emails – Users receive an unsubscription email upon removal.
✅ Real-time Status Check – The system checks if an email is already subscribed.
✅ Secure Environment Variables – Uses .env to store sensitive credentials.


/project-root
  ├── /client  (Frontend - React/Next.js)
  │   ├── pages/
  │   ├── src/
  │     ├── Subscription.jsx
  │   ├── package.json
  ├── /server  (Backend - Node.js/Express)
  │   ├── index.js
  │   ├── .env  ✅ (Stores database & email credentials)
  │   ├── package.json
  ├── README.md


🖥️ Frontend (React/Next.js)
📍 Features
Provides a simple UI for email subscription and unsubscription.
Displays toast notifications for success and errors.
Uses Axios for API requests.
Auto-checks if an email is already subscribed.


🖥️ Backend (Node.js/Express)
📍 Features
Uses MySQL to store emails.
Uses Nodemailer to send subscription confirmation emails.
Provides API routes for subscribing, unsubscribing, and checking email status.


📢 API Endpoints
***Method	Endpoint	Description***
->POST	/check-status	Checks if an email is subscribed
->POST	/subscribe	Subscribes an email & sends a confirmation email
->DELETE	/unsubscribe	Removes an email from the list & sends an unsubscription email


🛠️ Technologies Used
Frontend: React.js , Axios, React Toastify, Lucide Icons
Backend: Node.js, Express.js, MySQL, Nodemailer, dotenv
Database: MySQL (Hosted on FreeSQLDatabase)

🌎 Deployment
Frontend: Deploy Firebase 
Backend: Deploy on Render
Database: Hosted on FreeSQLDatabase.com


🎯 Future Improvements
🔹 Add user authentication (JWT or OAuth).
🔹 Improve UI with TailwindCSS / Material UI.
🔹 Store user preferences for better email management.


📌 How to Use?
1️⃣ Enter your email
2️⃣ Click Subscribe
3️⃣ Check your inbox for a confirmation email
4️⃣ Click Unsubscribe to remove your email


