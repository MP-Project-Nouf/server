const express = require("express");
const {addChall,getAllChall } = require("./../controllers/challenge");
const challengeRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

challengeRouter.post("/addChall",authontication,addChall);
// solutionRouter.delete("/education/:id",authontication,deleteeducation);
challengeRouter.get("/challenge",authontication,Authorization,getAllChall);



module.exports = challengeRouter;