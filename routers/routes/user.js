const express = require("express");
const { register,confirmEmail,login,getAllUser,getUserById,deleteUserbyId,addInerest,forgitpass,changepass,deleteinterest,comunication,editPesonalInfo,editAccountInfo } = require("./../controllers/user");
const userRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");


userRouter.post("/register",register);
userRouter.get("/confirmation/:email/:rand",confirmEmail);
userRouter.post("/login",login);
userRouter.get("/getAllUsers",getAllUser);
userRouter.get("/user/:id",getUserById);
userRouter.delete("/user/:id",authontication,deleteUserbyId);
userRouter.post("/interest",authontication,addInerest);
userRouter.delete("/interest/:interest",authontication,deleteinterest);
userRouter.post("/forgit",forgitpass);
userRouter.post("/changepass",changepass);
userRouter.put("/comunication",authontication,comunication);
userRouter.put("/pesonalInfo",authontication,editPesonalInfo);
userRouter.put("/accountInfo",authontication,editAccountInfo);



module.exports = userRouter;