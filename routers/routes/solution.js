const express = require("express");
const {addsolution } = require("./../controllers/solution");
const solutionRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

solutionRouter.post("/education",authontication,addsolution);
// solutionRouter.delete("/education/:id",authontication,deleteeducation);
// solutionRouter.get("/education/:user",authontication,geteducationByuser);



module.exports = solutionRouter;