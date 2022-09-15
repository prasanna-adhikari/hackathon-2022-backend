import { fileUpload } from "../middleware/middleware.js";
import express from "express";
import {
  addTask,
  deleteTask,
  updateTask,
  viewAllTasks,
  viewSingleTasks,
} from "../controller/task.controller.js";
const taskRoute = express.Router();
taskRoute.post("/add-task", fileUpload.single("files"), addTask);
taskRoute.get("/task", viewAllTasks);
taskRoute.get("/single-task/:id", viewSingleTasks);
taskRoute.patch("/update-task/:taskID", updateTask);
taskRoute.delete("/delete-task/:taskID", deleteTask);

export default taskRoute;
