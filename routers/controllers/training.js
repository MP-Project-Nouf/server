const trainingModel = require("./../../db/models/training");
const userModel = require("./../../db/models/user");

//start addeducation function
const addtraining=(req,res)=>{
    const {center,certificate,begining,end}=req.body;
    const userId=req.token.id;
    const newTrainingModel = new trainingModel({
        center,
        certificate,
        begining,
        end,
        user:userId
       
      });
      newTrainingModel
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
// const editfavoritLang=(req,res)=>{
//   const {faveLang}=req.body;
//   const userId=req.token.id;
//   userModel
//   .findOneAndUpdate(
//     { _id: userId },
//     { $push: { faveLang } } ,
//     {
//       new: true,
//     }
//   ).then((result) => {
//     res.status(200).json(result);
//   })
//   .catch((err) => {
//     console.log("err", err);
//     res.status(404).json("user not found");
//   });


// }
//end editfavoritLang function


module.exports = {addtraining };