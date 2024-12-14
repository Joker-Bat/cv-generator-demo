const openai = require("../openai");
const gemini = require("../gemini");
const dataStore = require("../store");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { savePdfFile, deleteFile } = require("../utils/helpers");

exports.uploadUserResume = catchAsync(async (req, res, next) => {
  const userId = req.userId;

  if (!req.file) {
    return next(new AppError("Select file to upload", 400));
  }

  const filePath = await savePdfFile(req.file);
  console.log("File Created");

  const llm = req.body.llm; // gemini or openai

  let jsonData;
  if (llm === "openai") {
    jsonData = await openai.getJSONFromPdf(filePath);
  } else if (llm === "gemini") {
    jsonData = await gemini.getJSONFromPdf(filePath);
  } else {
    return next(
      new AppError(`Unknown llm: ${llm}, valid values: 'openai', 'gemini'`, 400)
    );
  }

  console.log("🚀 ~ jsonData:", jsonData);
  dataStore.updateProfileDetails(userId, jsonData);

  // Removing file
  console.log("Removing file");
  await deleteFile(filePath);

  res.status(200).json("User profile details updated");
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const user = dataStore.getUserData(userId);

  if (!dataStore.userHasProfileDetails(userId)) {
    return res.status(404).send("User doesn't have any profile details!");
  }

  return res.status(200).json({ data: user });
});

exports.updateUserDetails = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const payload = req.body;

  dataStore.updateProfileDetails(userId, payload);

  return res.status(204).send("Updated Successfully");
});
