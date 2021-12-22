const express = require("express");
const { addtraining,deleteTraining,gettrainingByuser } = require("./../controllers/training");
const trainingRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

trainingRouter.post("/training",authontication,addtraining);
trainingRouter.delete("/training/:id",authontication,deleteTraining);
trainingRouter.get("/training/:user",authontication,gettrainingByuser);



module.exports = trainingRouter;