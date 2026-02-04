import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    details: String,
    category: String,
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
