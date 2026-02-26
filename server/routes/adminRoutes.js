import express from "express";
import {
  getAllStudents,
  addStudent,
  deleteStudent,
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/students", protect, adminOnly, getAllStudents);
router.post("/students", protect, adminOnly, addStudent);
router.delete("/students/:id", protect, adminOnly, deleteStudent);

export default router;
