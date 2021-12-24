const express = require("express");
const {addsolution,getSoulByChall,getSoulByuser } = require("./../controllers/solution");
const solutionRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

solutionRouter.post("/solution",authontication,addsolution);
solutionRouter.get("/solution/:chall",authontication,getSoulByChall);
solutionRouter.get("/sol/:user",authontication,getSoulByuser);



module.exports = solutionRouter;