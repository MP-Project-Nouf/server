const express = require("express");
const { addeducation,deleteeducation } = require("./../controllers/education");
const educationRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

educationRouter.post("/education",authontication,addeducation);
educationRouter.delete("/education/:id",authontication,deleteeducation);



module.exports = educationRouter;