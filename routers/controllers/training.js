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
const deleteTraining=(req,res)=>{
    const {id}=req.params;
    trainingModel
    .findByIdAndDelete({_id:id})
    .then(()=>{
        res.status(200).json("training deleted succsesfull");
    })
    .catch((err) => {
        console.log("err", err);
        res.status(404).json("training not found");
      });
}
//end deleteeducation function


module.exports = {addtraining,deleteTraining };