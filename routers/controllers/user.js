const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;
const nodemailer = require("nodemailer");
// const passport = require('passport');

// const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    const { email, username, password, role, avatar } = req.body;
    if (
      /\d/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password) &&
      password.length > 6
    ) {
      const savedEmail = email.toLowerCase();
      const savedName = username.toLowerCase();
      const savedPassword = await bcrypt.hash(password, SALT);
      rand = Math.floor(Math.random() * 100 + 54);
  
      const newUser = new userModel({
        email: savedEmail,
        username: savedName,
        password: savedPassword,
        role,
        avatar,
        rand,
      });
      newUser
        .save()
        .then((result) => {
          // console.log("HOST",HOST);
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: { user: process.env.USER, pass: process.env.PASS },
          });
          const mailOptions = {
            from: "nouf.ateeq@gmail.com",
            to: result.email,
            subject: "Account Verification Link",
            text:
              "Hello " +
              result.username +
              ",\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/confirmation/" +
              result.email +
              "/" +
              rand +
              "\n\nThank You!\n",
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              res.status(500).send({
                msg: "Technical Issue!, Please click on resend for verify your Email.",
              });
            }
            res
              .status(200)
              .send(
                "A verification email has been sent to " +
                  result.email +
                  ". It will be expire after one day. If you not get verification Email click on resend link."
              );
          });
  
          // res.status(201).json(result);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      res.status(400).json({ msg: "your password not complex" });
    }
  };

  module.exports = { register };