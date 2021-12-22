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

//start geteducationByuser function
// const geteducationByuser=(req,res)=>{
//   const {user}=req.params;
//   educationModel
// .find({user})
// .then((result) => {
//     if(result){
     
//   res.status(200).json(result);
//     }else{
//       res.status(404).json("not found any traing"); 
//     }
// })
// .catch((err) => {
//   console.log("err",err);
//   res.status(400).json(err);
// });
// };
//end geteducationByuser function


module.exports = {addChall};