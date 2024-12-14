const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { generateRandomOTP, isOTPExpired } = require("../utils/helpers");
const dataStore = require("../store");
const Email = require("../utils/email");

const TEMP_STORE = {};

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return next(new AppError("Provide valid emailId", 400));
  }

  // generate OTP
  const OTP = await generateRandomOTP();

  TEMP_STORE[email] = {
    otp: OTP.toString(),
    createdAt: new Date().toISOString(),
  };

  const template = `
    <h1>Your OTP for verification: <strong>${OTP}</strong></h1>
  `;

  await Email.send(email, template);

  return res.status(200).send("Verification OTP sent");
});

exports.verify = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const userOTP = req.body.otp;

  if (!email) {
    return next(new AppError("Provide valid emailId", 400));
  }

  if (!userOTP || userOTP.length !== 6) {
    return next(new AppError("Provide valid 6 digit OTP", 400));
  }

  // Check if user generated OTP
  const storedData = TEMP_STORE[email];
  if (!storedData) {
    return next(new AppError("OTP not found", 400));
  }

  // Check if OTP expired
  if (isOTPExpired(storedData.createdAt)) {
    return next(new AppError("OTP Expired", 400));
  }

  // Check if OTP's are equal
  if (storedData.otp !== userOTP) {
    return next(new AppError("Invalid OTP", 400));
  }

  // User verified, check if it's new user
  let hasProfileData = false;
  let userId;

  const user = dataStore.userByEmail(email);
  if (user) {
    hasProfileData = dataStore.userHasProfileDetails(user.id);
    userId = user.id;
  } else {
    userId = dataStore.addUser(email);
  }

  return res.status(201).json({ userId, hasProfileData });
});
