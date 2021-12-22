const solutionModel = require("./../../db/models/solution");

//start addeducation function
const addsolution=(req,res)=>{
    const {image,username,solve,date,challenge}=req.body;
    const userId=req.token.id;
    const newSolutionModel = new solutionModel({
        image,
        username,
        solve,
        date,
        challenge,
        user:userId
       
      });
      newSolutionModel
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


module.exports = {addsolution};