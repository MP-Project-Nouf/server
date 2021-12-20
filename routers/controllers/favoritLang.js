const favortLnagModel = require("./../../db/models/favortLnag");

//start addfavoritLang function
const addfavoritLang=(req,res)=>{
    const {language,expertise}=req.body;
    const userId=req.token.id;
    const newFavortLnagModel = new favortLnagModel({
        language,
        expertise,
        user:userId
       
      });
      newFavortLnagModel
        .save()
        .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
            res.status(400).json(err);
    });
}
//end addfavoritLang function

//start editfavoritLang function
const editfavoritLang=(req,res)=>{
    const {language,expertise}=req.body;
    const userId=req.token.id;
    console.log("userId", userId);
    favortLnagModel
  .findOneAndUpdate(
    { $and: [ {user: userId}, {language:language} ] },
    {expertise:expertise } ,
    {
      new: true,
    }
  ).then((result) => {
    console.log("result", result);
    res.status(200).json(result);
  })
  .catch((err) => {
    console.log("err", err);
    res.status(404).json("user not found");
  });
}
//end editfavoritLang function

//start deletefavoritLang function
const deletefavoritLang=(req,res)=>{
    const {id}=req.params;
    favortLnagModel
    .findByIdAndDelete({_id:id})
    .then(()=>{
        res.status(200).json("favorit languge deleted succsesfull");
    })
    .catch((err) => {
        console.log("err", err);
        res.status(404).json("user not found");
      });
}
//end deletefavoritLang function


module.exports = {addfavoritLang,editfavoritLang,deletefavoritLang };