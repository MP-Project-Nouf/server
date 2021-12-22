const express = require("express");
const {addComment,getcommentByChall } = require("./../controllers/comment");
const commentRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

commentRouter.post("/comment",authontication,addComment);
// solutionRouter.get("/solution/:chall",authontication,getSoulByChall);
commentRouter.get("/comment/:chall",authontication,getcommentByChall);



module.exports = commentRouter;