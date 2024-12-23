const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const dataStore = require("../store");

exports.authRequired = catchAsync(async (req, res, next) => {
  let userId;
  if (req.headers["user_id"]) {
    userId = req.headers["user_id"];
  }

  if (!userId) {
    return next(new AppError("USER_ID not found in headers", 401));
  }

  const user = dataStore.getUserData(userId);
  if (!user) {
    return next(new AppError("user not found", 401));
  }

  req.userId = userId;
  next();
});
