const educationModel = require("./../../db/models/education");

//start addeducation function
const addeducation=(req,res)=>{
    const {level,college,speciall,enrollment,graduation}=req.body;
    const userId=req.token.id;
    const newEducationModel = new educationModel({
        level,
        college,
        speciall,
        enrollment,
        graduation,
        user:userId
       
      });
      newEducationModel
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


module.exports = {addeducation };