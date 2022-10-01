import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    clientID: {
      type: String,
      required: true,
    },
    releaseTag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      enum: ["batch import", "import", "dsr", "batch dsr", "complete"],
      // default: "import",
    },
    batchCount: {
      type: Number,
      default: 0,
    },
    isDSRReport: {
      type: Boolean,
      default: false,
    },
    isGeminiReport: {
      type: Boolean,
      default: false,
    },
    DSRReportNote: {
      type: String,
      default: "",
    },
    GeminiReportNote: {
      type: String,
      default: "",
    },
    // slug: {
    //   type: String,
    //   required: true,
    // },
    // files: [{ filename: String }],
  },

  {
    timestamps: true,
  }
);
const Tasks = mongoose.model("task", taskSchema);
export default Tasks;
