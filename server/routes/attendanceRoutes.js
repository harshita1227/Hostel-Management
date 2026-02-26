import express from "express";
import {
  markAttendance,
  getTodayAttendance,
  downloadCSV,
} from "../controllers/attendanceController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, markAttendance);
router.get("/today", protect, adminOnly, getTodayAttendance);
router.get("/csv", protect, adminOnly, downloadCSV);
import { getYearAttendance } from "../controllers/attendanceController.js";

router.get("/year/:year", protect, adminOnly, getYearAttendance);


export default router;
