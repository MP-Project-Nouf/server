const express = require("express");
const { register,confirmEmail,login,getAllUser,getUserById } = require("./../controllers/user");
const userRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");


userRouter.post("/register",register);
userRouter.get("/confirmation/:email/:rand",confirmEmail);
userRouter.post("/login",login);
userRouter.get("/getAllUsers",getAllUser);
userRouter.get("/user/:id",getUserById);


module.exports = userRouter;