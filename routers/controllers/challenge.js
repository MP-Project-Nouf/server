const challengeModel = require("./../../db/models/challenge");

//start addChall function
const addChall=(req,res)=>{
    const {disc,title,point,level,input,output}=req.body;
    const userId=req.token.id;
    const newChallengeModel = new challengeModel({
        disc,
        title,
        point,
        level,
        input,
        output,
        user:userId
       
      });
      newChallengeModel
        .save()
        .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
            res.status(400).json(err);
    });
}
//end addChall function

//start getAllChall function
const getAllChall=(req, res) => {
    challengeModel
      .find({})
      .then((result) => {
          if(result){
        res.status(200).json(result);
          }else{
            res.status(404).json("not found any challenge"); 
          }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  //end  getAllChall function


//start deleteeducation function
// const deleteeducation=(req,res)=>{
//     const {id}=req.params;
//     educationModel
//     .findByIdAndDelete({_id:id})
//     .then(()=>{
//         res.status(200).json("education deleted succsesfull");
//     })
//     .catch((err) => {
//         console.log("err", err);
//         res.status(404).json("education found");
//       });
// }
//end deleteeducation function

//start getChallengeByUser function
const getChallengeByUser=(req,res)=>{
  const {user}=req.params;
  challengeModel
.find({user})
.then((result) => {
    if(result){
     
  res.status(200).json(result);
    }else{
      res.status(404).json("not found any challeng"); 
    }
})
.catch((err) => {
  console.log("err",err);
  res.status(400).json(err);
});
};
//end getChallengeByUser function

//start getChallById function
const getChallById=(req,res)=>{
    const {id}=req.params;
    challengeModel
  .findOne({_id:id})
  .then((result) => {
      if(result){
       
    res.status(200).json(result);
      }else{
        res.status(404).json("challenge not found"); 
      }
  })
  .catch((err) => {
    console.log("err",err);
    res.status(400).json(err);
  });
  };
  //end getChallById function

  //start getChallbylevel function
const getChallbylevel=(req,res)=>{
    const {level}=req.params;
    challengeModel
  .findOne({level})
  .then((result) => {
      if(result){
       
    res.status(200).json(result);
      }else{
        res.status(404).json("challenge not found"); 
      }
  })
  .catch((err) => {
    console.log("err",err);
    res.status(400).json(err);
  });
  };
  //end getChallbylevel function


module.exports = {addChall,getAllChall,getChallengeByUser,getChallById,getChallbylevel};