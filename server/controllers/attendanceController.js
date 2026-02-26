import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// MARK ATTENDANCE
export const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOneAndUpdate(
      { student: studentId, date: today },
      { status },
      { upsert: true, new: true }
    );

    res.json({ message: "Attendance marked", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET TODAY ATTENDANCE
export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const records = await Attendance.find({ date: today })
      .populate("student", "name email room");

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
export const getYearAttendance = async (req, res) => {
  try {
    const { year } = req.params;

    const records = await Attendance.find()
      .populate({
        path: "student",
        match: { year },
        select: "name email year",
      });

    const filtered = records.filter(r => r.student);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DOWNLOAD CSV
export const downloadCSV = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("student", "name email");

    let csv = "Name,Email,Date,Status\n";

    records.forEach((r) => {
      csv += `${r.student.name},${r.student.email},${r.date},${r.status}\n`;
    });

    

    res.header("Content-Type", "text/csv");
    res.attachment("attendance.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
