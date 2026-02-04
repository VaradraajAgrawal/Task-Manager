import {
  getRequest,
  postRequest,
  deleteRequest,
  completeRequest,
} from "../Controller/TaskController.js";
import express from "express";

const Taskroute = express.Router();

Taskroute.get("/", getRequest);
Taskroute.post("/", postRequest);
Taskroute.delete("/:id", deleteRequest);
Taskroute.put("/:id", completeRequest);

export default Taskroute;
