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


//start deleteeducation function
const deleteeducation=(req,res)=>{
    const {id}=req.params;
    educationModel
    .findByIdAndDelete({_id:id})
    .then(()=>{
        res.status(200).json("education deleted succsesfull");
    })
    .catch((err) => {
        console.log("err", err);
        res.status(404).json("education found");
      });
}
//end deleteeducation function


module.exports = {addeducation,deleteeducation };