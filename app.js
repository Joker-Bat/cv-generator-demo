const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const globalErrorHandler = require("./middlewares/error");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const { authRequired } = require("./middlewares/auth");

const app = express();

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("/api/auth", authRouter);
app.use("/api/user", authRequired, userRouter);

// Catch all requests that don't match any route
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.use(globalErrorHandler);
