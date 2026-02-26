import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Hostel Management Backend Running 🚀");
});

// routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoutes);

import attendanceRoutes from "./routes/attendanceRoutes.js";
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


