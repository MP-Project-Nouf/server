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


module.exports = {addtraining };