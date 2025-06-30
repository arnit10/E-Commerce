const nodemailer = require("nodemailer");

const sendOTPEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
  from: process.env.EMAIL_USER,
  to,
  subject: "🔐 Your OTP for Registration on NextCart",
  text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4f46e5;">NextCart Registration OTP</h2>
      <p>Hello,</p>
      <p>Thank you for registering with <strong>NextCart</strong>.</p>
      <p>Your One-Time Password (OTP) is:</p>
      <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #1d4ed8;">
        ${otp}
      </div>
      <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
      <br/>
      <p>Best Regards,</p>
      <p><strong>NextCart Team</strong></p>
    </div>
    `,
    };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
