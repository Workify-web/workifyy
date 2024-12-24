const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP host
  port: 465, // Port 465 for SSL (secure), or use 587 for TLS
  secure: true, // Use SSL (true for port 465, false for port 587)
  auth: {
    user: 'wworkifyy@gmail.com', // Your Gmail address
    pass: 'auev jzoo vbnv xfpk', // App password from Google, NOT your regular Gmail password
  },
  logger: true, // Enable logging
  debug: true, // Enable debug output
});

// Function to send OTP email
const sendOtpEmail = (email, otp) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'wworkifyy@gmail.com', // Sender address
      to: email, // Receiver's email
      subject: 'Your OTP for Account Verification', // Email subject
      html: `
        <p>Your OTP for account verification is: <strong>${otp}</strong></p>
        <p>Please use this OTP to verify your account.</p>
      `, // Email content
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error in sending email:', error); // Log error
        reject(error);
      } else {
        console.log('Email sent:', info.response); // Log success
        resolve(info); // Resolve the promise with the result
      }
    });
  });
};

module.exports = sendOtpEmail;
