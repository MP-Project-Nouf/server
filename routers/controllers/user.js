const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;
const nodemailer = require("nodemailer");
const passport = require("passport");
//const sgMail = require("@sendgrid/mail");

// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//start register function
const register = async (req, res) => {
  try {
  const { firstname, lastname, email, username, password, role } = req.body;
  const savedEmail = email.toLowerCase();
  const savedName = username.toLowerCase();
  const found = await userModel.findOne({
    $or: [{ email: savedName }, { username: savedName }],
  });
  if (found) {
    return res.status(400).json({
      message: "اسم المستخدم او كلمة المرور موجود مسبقا",
    });
  }
  if (
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password) &&
    password.length > 6
  ) {
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
    });

    const result = await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.USER, pass: process.env.PASS },
    });
    const mailOptions = {
      from: "master.nouf@gmail.com",
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
    const mailResult = await transporter.sendMail(mailOptions);
  
    res.status(200).json({
      message:
        "A verification email has been sent to " +
        result.email +
        ". It will be expire after one day. If you not get verification Email click on resend link.",
    });
 
  } else {
    res.status(400).json({
      message:"Bad password "
    });
  }

  } catch(e) {
    console.log(e)
    res.status(500).json({
      message:"Server Error "
    });
}};
//end register function

//start login function
const login = (req, res) => {
  const { input, password } = req.body;
  newInput = input.toLowerCase();
  userModel
    .findOne({ $or: [{ email: newInput }, { username: newInput }] })
    .then(async (result) => {
      if (result) {
        if (result.isDel) {
          return res.status(203).json("your account has been deleted");
        }
        //unhash password
        const savePass = await bcrypt.compare(password, result.password); //compare return boolean
        if (savePass) {
          if (!result.isActive) {
            return res.status(203).json("Your Email has not been verified");
          }
          const payload = {
            role: result.role,
            id: result._id,
          };
          const options = { expiresIn: "600m" };
          const token = await jwt.sign(payload, secret, options);
          res.status(200).json({ result, token });
        } else {
          res.status(206).json("invalid email or password");
        }
      } else {
        res.status(206).json("invalid email or password");
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

//start forgitpass function
const forgitpass = (req, res) => {
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      const mailOptions = {
        from: "nouf.ateeq@gmail.com",
        to: result.email,
        subject: "Account Verification Link",
        text:
          "Hello " +
          result.name +
          ",\n\n" +
          "Please copy this code to change your password: \n" +
          result.rand +
          "\n\nThank You!\n",
      };

      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({
            msg: "Technical Issue!, Please click on resend for change.",
          });
        }
        return res.status(200).send("code has been sent to " + result.email);
      });
    })

    .catch((err) => {
      console.log("err", err);
      return res.status(400).send({
        msg: "We were unable to find a user with that email. Make sure your Email is correct!",
      });
    });
};
//end forgitpass function

//start changpass function
const changepass = async (req, res) => {
  const { email, rand, password } = req.body;
  const savedPassword = await bcrypt.hash(password, SALT);
  userModel
    .findOneAndUpdate(
      { $and: [{ email }, { rand }] },
      { password: savedPassword },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//end changepass function

//start getAllUsers function
const getAllUser = (req, res) => {
  userModel
    .find({ $and: [{ isDel: false }, { isActive: true }] })
    .sort({ point: -1 })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("not found any user");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//end  getAllUsers function

//start getUserById function
const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .findOne({ $and: [{ _id: id }, { isDel: false }, { isActive: true }] })
  
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("not found any user");
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json(err);
    });
};
//end getUserById function

//start deleteUserbyId function
const deleteUserbyId = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndUpdate({ _id: id }, { isDel: true })
    .then(() => {
      res.status(200).json({ message: "User has been deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//end deleteUserbyId function

//start addInterest function
const addInerest = (req, res) => {
  const { interest } = req.body;
  const userId = req.token.id;
  userModel
    .findOneAndUpdate(
      { _id: userId },
      { $push: { interest: [...interest] } },
      {
        new: true,
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("user not found");
    });
};
//end addInterest function

//start deleteinterest function
const deleteinterest = (req, res) => {
  const { interest } = req.params;
  const userId = req.token.id;
  userModel
    .findOneAndUpdate(
      { _id: userId },
      { $pull: { interest } },
      {
        new: true,
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("user not found");
    });
};
//end deleteinterest function



//start comunication function
const comunication = (req, res) => {
  const { github, website, stackflow, twitter, linkedin } = req.body;
  const userId = req.token.id;
  if (github) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { github },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (website) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { website },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (stackflow) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { stackflow },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (twitter) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { twitter },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (linkedin) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { linkedin },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
};
//end comunication function

//start editPesonalInfo function
const editPesonalInfo = (req, res) => {
  const { birth, country, city, nationality, gender, workStatus } = req.body;
  const userId = req.token.id;
  if (birth) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { birth },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (country) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { country },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (city) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { city },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (nationality) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { nationality },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (gender) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { gender },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (workStatus) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { workStatus },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
};
//end editPesonalInfo function

//start editAccountInfo function
const editAccountInfo = (req, res) => {
  const { avatar, firstname, lastname, username, email, phone, level, point } =
    req.body;
  const userId = req.token.id;
  if (avatar) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { avatar },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (firstname) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { firstname },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (lastname) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { lastname },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (username) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { username },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (email) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { email },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (phone) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { phone },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (level) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { level },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
  if (point) {
    userModel
      .findOneAndUpdate(
        { _id: userId },
        { point },
        {
          new: true,
        }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
  }
};
//end editAccountInfo function

//start search function
const searchUser = (req, res) => {
  const { name } = req.params;
  userModel.find(
    {
      $or: [
        { username: { $regex: new RegExp(name) } },
        { password: { $regex: new RegExp(name) } },
      ],
    },
    {
      _v: 0,
    },
    function (err, data) {
      res.json(data);
    }
  );
};
// end serach function

module.exports = {
  register,
  confirmEmail,
  login,
  getAllUser,
  getUserById,
  deleteUserbyId,
  addInerest,
  forgitpass,
  changepass,
  deleteinterest,
  comunication,
  editPesonalInfo,
  editAccountInfo,
  searchUser,
};
