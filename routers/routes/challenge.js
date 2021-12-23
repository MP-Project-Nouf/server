const express = require("express");
const {addChall,getAllChall,getChallengeByUser,getChallById,getChallbylevel,editChall,confChall,deleteChall } = require("./../controllers/challenge");
const challengeRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

challengeRouter.post("/addChall",authontication,addChall);
challengeRouter.delete("/challenge/:id",authontication,Authorization,deleteChall);
challengeRouter.get("/challenge",authontication,Authorization,getAllChall);
challengeRouter.get("/chall/:user",authontication,getChallengeByUser);
challengeRouter.get("/challById/:id",authontication,getChallById );
challengeRouter.get("/challByLevel/:level",authontication,getChallbylevel );
challengeRouter.put("/challenge",authontication,Authorization,editChall);
challengeRouter.put("/configchall",authontication,Authorization,confChall);



module.exports = challengeRouter;