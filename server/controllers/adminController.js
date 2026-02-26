import User from "../models/User.js";

// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD STUDENT
export const addStudent = async (req, res) => {
  const { name, rollNo, email, room, year, course, branch } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await User.create({
      name,
      rollNo,
      email,
      password: "123456",
      role: "student",
      room,
      year: Number(year),
      course,
      branch,
    });

    res.json({ message: "Student added", student });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
