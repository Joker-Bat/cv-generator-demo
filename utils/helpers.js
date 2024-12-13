const crypto = require("crypto");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs/promises");

const randomIntAsync = promisify(crypto.randomInt);

const generateRandomOTP = async () => {
  return await randomIntAsync(100000, 1000000);
};

const isOTPExpired = otpGeneratedTime => {
  const currentTime = new Date().toISOString();

  const differenceInMilliseconds = Math.abs(otpGeneratedTime - currentTime);
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  return differenceInMinutes > 5;
};

const savePdfFile = async file => {
  const ext = path.extname(file.originalname);
  const pdfFileName = path.basename(file.originalname, ext);

  const filePath = path.join(
    __dirname,
    "../uploads/",
    `${pdfFileName}-${Date.now()}.${ext}`
  );

  await fs.writeFile(filePath, file.buffer);

  return filePath;
};

const deleteFile = async path => {
  await fs.unlink(filePath);
};

module.exports = {
  generateRandomOTP,
  isOTPExpired,
  savePdfFile,
  deleteFile,
};
