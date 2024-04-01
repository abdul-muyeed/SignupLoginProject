// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "77b07300b0909f",
    pass: "c5d146b94f4ff4",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async (mail, token, action) => {
  // send mail with defined transport object
  if (mail && token && action === "resetPassword") {
    const info = await transport.sendMail({
      from: '"Abdul Muyeed 👻" <abdul@webdev.com>', // sender address
      to: `abdulmuyeed47@gmail.com, ${mail}`, // list of receivers
      subject: "Reset Password", // Subject line
      text: "Dear User,", // plain text body
      html: `
      <br>
    <div>
        <div>
            <h1>Reset Password</h1>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
        </div>
        <a target="_blank" href="http://localhost:5173/resetpassword?key=${token}" class="button">Reset Password</a>
        <div class="footer">
            <p>If the button does not work, use this link: http://localhost:5173/resetpassword?key=${token}</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
    </div>

      `, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

  if (mail && token && action === "verifyEmail") {
    const info = await transport.sendMail({
      from: '"Abdul Muyeed 👻" <abdul@webdev.com>', // sender address
      to: `abdulmuyeed47@gmail.com, ${mail}`, // list of receivers
      subject: "Verify Mail", // Subject line
      text: "Dear User,", // plain text body
      html: `
      <br>
    <div>
        <div>
            <h1>verify Email</h1>
            <p>We received a request to verify your mail. Click the button below to verify your mail:</p>
        </div>
        <a href="http://localhost:5173/verify?key=${token}" class="button">Verify Mail</a>
        <div class="footer">
            <p>If the button does not work, use this link: http://localhost:5173/verify?key=${token}</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
    </div>

      `, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

sendMail().catch(console.error);
