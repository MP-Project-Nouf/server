const express = require("express");
const {addChall } = require("./../controllers/challenge");
const challengeRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

challengeRouter.post("/addChall",authontication,addChall);
// solutionRouter.delete("/education/:id",authontication,deleteeducation);
// solutionRouter.get("/education/:user",authontication,geteducationByuser);



module.exports = challengeRouter;