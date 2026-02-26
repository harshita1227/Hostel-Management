The Hostel Management System is a full-stack MERN web application designed to automate and digitize hostel operations. It enables secure student and admin authentication, room allocation management, and room-based daily attendance tracking. The system provides interactive dashboards built with React and Redux, while the backend is powered by Node.js and Express with MongoDB for persistent data storage. It also supports CSV report generation for attendance records, helping replace manual registers and spreadsheets with a centralized, efficient, and secure digital workflow.


💻 Local Setup & Installation
📌 Prerequisites

Make sure you have installed:

Node.js (v16 or above recommended)

npm (comes with Node.js)

MongoDB (local or MongoDB Atlas)

Check versions:

node -v
npm -v
🚀 Clone The Repository
git clone https://github.com/harshita1227/Hostel-Management.git
cd Hostel-Management
⚙️ Backend Setup (Server)
cd server
npm install

Create .env file inside server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend:

npm run dev

OR

npm start

Backend runs at:

http://localhost:5000
🎨 Frontend Setup (Client)

Open new terminal:

cd client
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔗 API Connection

Make sure your frontend API base URL is:

http://localhost:5000/api


Frontend:

npm run build
