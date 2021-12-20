const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;
const nodemailer = require("nodemailer");
// const passport = require('passport');

// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//start register function
const register = async (req, res) => {
    const { firstname,lastname,email,username,phone,password,role } = req.body;
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
      rand = Math.floor(Math.random() * 2222 + 54);
  
      const newUser = new userModel({
        email: savedEmail,
        username: savedName,
        password: savedPassword,
        role,
        firstname,
        lastname,
        rand,
        phone
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
  //end register function

  //start login function
  const login = (req, res) => {
    const { name, password } = req.body;
  
    const savedname = name.toLowerCase();
  
    userModel
      .findOne({ $or: [{ email: savedname }, { username: savedname }] })
      .then(async (result) => {
        if (result) {
          if (result.isActive === false) {
            res.status(401).json({
              msg: "Your Email has not been verified. Please click on resend",
            });
          } else {
            const hashedPass = await bcrypt.compare(password, result.password);
            if (hashedPass) {
              const payload = {
                role: result.role,
                id: result._id,
              };
              const options = { expiresIn: "300m" };
              const token = await jwt.sign(payload, secret, options);
              res.status(200).json({ result, token });
            } else {
              res.status(400).json("invalid email or password");
            }
          }
        } else {
          res.status(404).json("user does not exit");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  //end login function

  //start confirm email function
  const confirmEmail = (req, res) => {
    const { email } = req.params;
  
    try {
      userModel
        .findOneAndUpdate(
          { email: email },
          { isActive: true },
          {
            new: true,
          }
        )
        .then((result) => {
          console.log("result", result);
          res.status(200).send("Your account has been successfully verified");
        })
        .catch((err) => {
          console.log("err", err);
          res.status(404).json("user not found");
        });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  //end confirm email function

  //start getAllUsers function
  const getAllUser=(req, res) => {
    userModel
      .find({})
      .then((result) => {
          if(result){
        res.status(200).json(result);
          }else{
            res.status(404).json("not found any user"); 
          }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  //end  getAllUsers function

  //start getUserById function
  const getUserById=(req,res)=>{
      const {id}=req.params;
    userModel
    .findOne({_id:id})
    .then((result) => {
        if(result){
      res.status(200).json(result);
        }else{
          res.status(404).json("not found any user"); 
        }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
  //end getUserById function

  


  module.exports = { register,confirmEmail,login,getAllUser,getUserById };