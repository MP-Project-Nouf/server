const express = require("express");
const { addRole } = require("./../controllers/user");
const userRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");


userRouter.post("/",addRole);


module.exports = roleRouter;