import Files from "../models/files.model.js";
export const addFile = async (req, res) => {
  const { task } = req.body;
  const filePath = req?.file?.path;
  const fileName = req?.file?.originalname;
  console.log(req.file);
  try {
    const fileObj = new Files({
      filePath,
      fileName,
      task,
      //   files,
    });

    const newFile = await fileObj.save();
    if (newFile) {
      return res.status(200).json({
        success: true,
        message: "New file added",
        result: newFile,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add file.",
      developerMessage: error.message,
      result: {},
    });
  }
};
export const viewFiles = async (req, res) => {
  const taskID = req?.params.id;

  try {
    const fileList = await Files.find({ task: taskID });
    const totalFiles = await Files.countDocuments({ task: taskID });
    if (totalFiles > 0) {
      return res.status(200).json({
        success: true,
        message: "Fetched Data",
        developerMessage: "",
        result: fileList,

        total: totalFiles,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No File found.",
        developerMessage: "",
        result: [],

        total: totalFiles,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Could not fetch File",
      developerMessage: error.message,
      result: [],
    });
  }
};
