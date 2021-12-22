const express = require("express");
const {addsolution,getSoulByChall } = require("./../controllers/solution");
const solutionRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

solutionRouter.post("/solution",authontication,addsolution);
// solutionRouter.delete("/education/:id",authontication,deleteeducation);
solutionRouter.get("/solution/:chall",authontication,getSoulByChall);



module.exports = solutionRouter;