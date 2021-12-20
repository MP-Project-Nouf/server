const express = require("express");
const { addRole } = require("./../controllers/role");
const roleRouter = express.Router();
// const authontication=require("./../middelwares/authontication");
// const {Authorization,}=require("./../middelwares/");

roleRouter.post("/",addRole);


module.exports = roleRouter;