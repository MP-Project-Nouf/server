const express = require("express");
const {addChall,getAllChall,getChallengeByUser,getChallById } = require("./../controllers/challenge");
const challengeRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

challengeRouter.post("/addChall",authontication,addChall);
// solutionRouter.delete("/education/:id",authontication,deleteeducation);
challengeRouter.get("/challenge",authontication,Authorization,getAllChall);
challengeRouter.get("/chall/:user",authontication,getChallengeByUser);
challengeRouter.get("/challById/:id",authontication,getChallById );



module.exports = challengeRouter;