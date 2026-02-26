import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },

    room: { type: String },

    year: {
      type: Number,
      enum: [1, 2, 3, 4],
    },

    course: {
      type: String,
      enum: ["BTech", "BCA", "MCA"],
    },

    branch: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
