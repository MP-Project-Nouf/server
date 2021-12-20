const express = require("express");
const { addfavoritLang } = require("./../controllers/favoritLang");
const favoritLangRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

favoritLangRouter.put("/favoritLang",authontication,addfavoritLang);



module.exports = favoritLangRouter;