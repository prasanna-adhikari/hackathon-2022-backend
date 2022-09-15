import mongoose from "mongoose";
import Tasks from "./task.mode.js";

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },
    task: {
      ref: Tasks,
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Files = mongoose.model("files", fileSchema);
export default Files;
