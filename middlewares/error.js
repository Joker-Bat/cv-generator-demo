module.exports = (err, req, res, next) => {
  console.log("🚀 ~ err:", err);

  if (err.isOperational) {
    return res.status(err.statusCode).send(err.message);
  }

  res.status(500).send("Something went wrong!");
};
