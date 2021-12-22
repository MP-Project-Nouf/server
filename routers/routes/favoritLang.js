const express = require("express");
const { addfavoritLang,editfavoritLang,deletefavoritLang,getfavLanByuser } = require("./../controllers/favoritLang");
const favoritLangRouter = express.Router();
const authontication=require("./../middelware/authontication");
const Authorization=require("./../middelware/authorization");

favoritLangRouter.post("/favoritLang",authontication,addfavoritLang);
favoritLangRouter.put("/favoritLang",authontication,editfavoritLang);
favoritLangRouter.delete("/favoritLang/:id",authontication,deletefavoritLang);
favoritLangRouter.get("/favoritLang/:user",authontication,getfavLanByuser);


module.exports = favoritLangRouter;