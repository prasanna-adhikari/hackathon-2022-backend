import Tasks from "../models/task.mode.js";

export const addTask = async (req, res) => {
  const { name, description } = req.body;
  const files = req?.file?.path;
  console.log(req.file);
  try {
    const taskObj = new Tasks({
      name,
      description,
      //   files,
    });

    const newTask = await taskObj.save();
    if (newTask) {
      return res.status(200).json({
        success: true,
        message: "New task added",
        result: newTask,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add task.",
      developerMessage: error.message,
      result: {},
    });
  }
};
export const viewAllTasks = async (req, res) => {
  const page = parseInt(req?.query.page) || 1;
  const limit = parseInt(req?.query.limit) || 0;
  const order = parseInt(req?.query.page) || 0;
  const sortby = req?.query.sortby;
  const id = req?.params.id;
  // const countryID = req?.query.countryID;
  // const slug = req?.query.slug;

  try {
    const taskList = await Tasks.find()
      .skip(page * limit - limit)
      // .sort(sortby == "a-z" ? { countryName: 1 } : { createdAt: -1 })
      .limit(limit);

    const totalTasks = await Tasks.countDocuments();
    if (totalTasks > 0) {
      return res.status(200).json({
        success: true,
        message: "Fetched data",
        developerMessage: "",
        result: taskList,
        page,
        total: totalTasks,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Task found.",
        developerMessage: "",
        result: [],
        page,
        total: totalTasks,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Could not fetch Task",
      developerMessage: error.message,
      result: [],
    });
  }
};

export const deleteTask = async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const deleteTask = await Tasks.findOneAndDelete({ _id: taskID });

    return res.status(SUCCESS).json({
      success: true,
      message: "Deleted successfully.",
      developerMessage: "",
      result: deleteTask,
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete task.",
      developerMessage: error.message,
      result: {},
    });
  }
};

export const viewSingleTasks = async (req, res) => {
  const page = parseInt(req?.query.page) || 1;
  const limit = parseInt(req?.query.limit) || 0;
  const order = parseInt(req?.query.page) || 0;
  const sortby = req?.query.sortby;
  const id = req?.params.id;
  // const countryID = req?.query.countryID;
  // const slug = req?.query.slug;

  try {
    const taskList = await Tasks.find({ _id: id })
      .skip(page * limit - limit)
      // .sort(sortby == "a-z" ? { countryName: 1 } : { createdAt: -1 })
      .limit(limit);

    const totalTasks = await Tasks.countDocuments({ _id: id });
    if (totalTasks > 0) {
      return res.status(200).json({
        success: true,
        message: sortby,
        developerMessage: "",
        result: taskList,
        page,
        total: totalTasks,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Task found.",
        developerMessage: "",
        result: [],
        page,
        total: totalTasks,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Could not fetch Task",
      developerMessage: error.message,
      result: [],
    });
  }
};

export const updateTask = async (req, res) => {
  const taskID = req.params.taskID;
  const {
    name,
    description,
    flag,
    isDSRReport,
    isGeminiReport,
    DSRReportNote,
    GeminiReportNote,
  } = req.body;

  try {
    const currentTask = await Tasks.findOne({ _id: taskID });
    if (currentTask) {
      currentTask.name = name;
      currentTask.flag = flag;
      currentTask.description = description;
      currentTask.isDSRReport = isDSRReport;
      currentTask.DSRReportNote = DSRReportNote;
      currentTask.GeminiReportNote = GeminiReportNote;
      currentTask.isGeminiReport = isGeminiReport;
      const updateTask = await currentTask.save();
      const taskList = await Tasks.find();

      return res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        developerMessage: "",
        updatedresult: updateTask,
        result: taskList,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Task Not found",
        developerMessage: "",
        result: {},
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to update city.",
      developerMessage: error.message,
      result: {},
    });
  }
};
