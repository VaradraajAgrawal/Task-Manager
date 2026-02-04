import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/config.js";
import Taskroute from "./routes/TaskRoute.js";
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/Task", Taskroute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
