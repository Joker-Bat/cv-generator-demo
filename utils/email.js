const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");

class EmailClient {
  constructor() {
    this.from = "noreply@cv-generator.com";
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN,
      },
    });
  }

  async send(to, message) {
    const mailOptions = {
      from: this.from,
      to: to,
      subject: "Verification OTP",
      html: message,
      text: htmlToText(message),
    };

    await this.transporter.sendMail(mailOptions);
  }
}

const Email = new EmailClient();

module.exports = Email;
