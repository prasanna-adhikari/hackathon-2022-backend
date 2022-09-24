import { fileUpload } from "../middleware/middleware.js";
import express from "express";
import {
  addFile,
  searchFiles,
  viewFiles,
} from "../controller/file.controller.js";
const fileRoute = express.Router();
fileRoute.post("/add-file", fileUpload.single("filePath"), addFile);
fileRoute.get("/file/:id", viewFiles);
fileRoute.get("/search-file/:id", searchFiles);

export default fileRoute;
