const express = require("express");

const { upload } = require("../middlewares/upload");
const {
  uploadUserResume,
  getUserDetails,
  updateUserDetails,
} = require("../controllers/user");

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadUserResume);

router.get("/", getUserDetails);

router.put("/edit", updateUserDetails);
// router.get("/files", async (req, res) => {
//   const files = await openai.listFiles();
//   return res.json(files);
// });

// router.get("/assistants", async (req, res) => {
//   const assistants = await openai.listAssistants();
//   return res.json(assistants);
// });

module.exports = router;
