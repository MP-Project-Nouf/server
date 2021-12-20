const express = require("express");
const { addtraining } = require("./../controllers/training");
const trainingRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

trainingRouter.put("/training",authontication,addtraining);



module.exports = trainingRouter;