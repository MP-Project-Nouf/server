const favortLnagModel = require("./../../db/models/favortLnag");

//start addfavoritLang function
const addfavoritLang = (req, res) => {
  const { language, expertise } = req.body;
  const userId = req.token.id;
  const newFavortLnagModel = new favortLnagModel({
    language,
    expertise,
    user: userId,
  });
  newFavortLnagModel
    .save()
    .then(async (result) => {
      // console.log("lang", result._id);
      // await userModel.findByIdAndUpdate(
      //   { _id: userId },
      //   { $push: { favLan: result._id } }
      // );
    
      console.log("lang", result._id);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//end addfavoritLang function

//start editfavoritLang function
const editfavoritLang = (req, res) => {
  const { language, expertise } = req.body;
  const userId = req.token.id;
  console.log("userId", userId);
  favortLnagModel
    .findOneAndUpdate(
      { $and: [{ user: userId }, { language: language }] },
      { expertise: expertise },
      {
        new: true,
      }
    )
    .then((result) => {
      console.log("result", result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("user not found");
    });
};
//end editfavoritLang function

//start deletefavoritLang function
const deletefavoritLang = (req, res) => {
  const { id } = req.params;
  favortLnagModel
    .findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).json("favorit languge deleted succsesfull");
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("user not found");
    });
};
//end deletefavoritLang function

//start getfavLanByuser function
const getfavLanByuser=(req,res)=>{
  const {user}=req.params;
  favortLnagModel
.find({user})
.then((result) => {
    if(result){
     
  res.status(200).json(result);
    }else{
      res.status(404).json("not found any traing"); 
    }
})
.catch((err) => {
  console.log("err",err);
  res.status(400).json(err);
});
};
//end getfavLanByuser function

module.exports = { addfavoritLang, editfavoritLang, deletefavoritLang,getfavLanByuser };
