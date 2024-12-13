var express = require("express");
var router = express.Router();
const { login, verify } = require("../controllers/auth");

/* GET home page. */
router.post("/login", login);
router.post("/verify", verify);

module.exports = router;
