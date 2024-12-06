var express = require("express");
var router = express.Router();
const dataStore = require("../store");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ success: true });
});

router.get("/resume/:uniqueId", async (req, res) => {
  const uniqueId = req.params.uniqueId;
  const jsonData = dataStore.getJsonData(uniqueId);
  console.log("🚀 ~ jsonData:", jsonData);

  if (jsonData) {
    return res.status(200).json({ data: jsonData });
  }

  res.status(404).send("Resume not found!");
  // if (jsonData) {
  //   res.render("template", { ...jsonData, layout: false });
  //   return;
  // }

  // res.status(404).send("Resume not found");
});

module.exports = router;
