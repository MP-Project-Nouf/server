const trainingModel = require("./../../db/models/training");
const userModel = require("./../../db/models/user");

//start addtraining function
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
          console.log("train",result._id)
          userModel
          .findByIdAndUpdate({_id:userId},{ $push: { training:result._id } })
            
        res.status(200).json(result);
    })
    .catch((err) => {
            res.status(400).json(err);
    });
}
//end addtraining function

//start deletetraining function
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
//end deletetraining function

 //start gettrainingByuser function
 const gettrainingByuser=(req,res)=>{
  const {user}=req.params;
  trainingModel
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
//end gettrainingByuser function


module.exports = {addtraining,deleteTraining,gettrainingByuser };