import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
// import { dirname } from "path";
import { fileURLToPath } from "url";
import taskRoute from "../api/routes/task.route.js";
import fileRoute from "../api/routes/file.route.js";
const VERSION = "/api/v1";
const app = express();

// file path
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const env = "development";

// const env = process.env.NODE_ENV;

// cors
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

if (env === "development") {
  app.use(morgan("dev"));
}

// app.use(express.static(__dirname + '/src/api/pictures'));
app.use("/files", express.static(path.join(__dirname, "../", "../", "files")));
// app.use('/uploads', express.static('uploads'));

// adding routes

app.use(VERSION, taskRoute);
app.use(VERSION, fileRoute);
// app.use(VERSION, rugRoute);
// app.use(VERSION, categoryRoutes);
// app.use(VERSION, uploadRoutes);
// app.use(VERSION, favRoutes);
// app.use(VERSION, aboutRoutes);
// app.use(VERSION, contactRoutes);
// app.use(VERSION, designRoute);
// app.use(VERSION, imageRoute);
// app.use(VERSION, homeRoute);
// app.use(VERSION, mailRoutes);

//

export default app;
