const express = require("express");
const { addeducation } = require("./../controllers/education");
const educationRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

educationRouter.put("/education",authontication,addeducation);



module.exports = educationRouter;