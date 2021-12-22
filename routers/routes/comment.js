const express = require("express");
const {addComment,getcommentByChall,delComment } = require("./../controllers/comment");
const commentRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

commentRouter.post("/comment",authontication,addComment);
commentRouter.delete("/delcomment/:id",authontication,delComment);
commentRouter.get("/comment/:chall",authontication,getcommentByChall);



module.exports = commentRouter;