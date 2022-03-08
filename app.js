const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan=require('morgan')
require("./db/index");

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

const roleRouter = require("./routers/routes/role");
app.use("/role", roleRouter);

const userRouter = require("./routers/routes/user");
app.use(userRouter);

const favoritLangRouter = require("./routers/routes/favoritLang");
app.use(favoritLangRouter);

const educationRouter = require("./routers/routes/education");
app.use(educationRouter);


const trainingRouter = require("./routers/routes/training");
app.use(trainingRouter);

const solutionRouter = require("./routers/routes/solution");
app.use(solutionRouter);

const challengeRouter = require("./routers/routes/challenge");
app.use(challengeRouter);

const commentRouter = require("./routers/routes/comment");
app.use(commentRouter);


const PORT =  7000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});