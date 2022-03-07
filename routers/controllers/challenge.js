const challengeModel = require("./../../db/models/challenge");

//start addChall function
const addChall=(req,res)=>{
    const {disc,title,input,output,defValue}=req.body;
    const userId=req.token.id;
    challengeModel
    .find()
      .then((resul)=>{
        const level=resul.length+1
        console.log("numLevel",level);
        const newChallengeModel = new challengeModel({
          disc,
          title,
          defValue,
          input,
          output,
          user:userId,
          level
         
        });
        newChallengeModel
        .save()
        .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
            res.status(400).json(err);
    });

      }).catch((err) => {
        res.status(400).json(err);
    
      
})
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


//start deleteChall function
const deleteChall=(req,res)=>{
    const {id}=req.params;
    challengeModel
    .findByIdAndDelete({_id:id})
    .then(()=>{
        res.status(200).json("challenge deleted succsesfull");
    })
    .catch((err) => {
        console.log("err", err);
        res.status(404).json("challenge not found");
      });
}
//end deleteChall function

//start getChallengeByUser function
const getChallengeByUser=(req,res)=>{
  const {user}=req.params;
  challengeModel
.find( { $and: [ { user }, {active:true }] })
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
  .findOne({$and: [ { level }, {active:true }] })
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

  //start editChall function
const editChall=(req,res)=>{
    const {disc,title,point,input,output,active,_id,defValue}=req.body;
    console.log("hello");
   if(disc.length)
   {
    challengeModel
    .findOneAndUpdate(
      { _id},
      {disc} ,
      {
        new: true,
      }
    ).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
   if(title.length)
   {
    challengeModel
    .findOneAndUpdate(
      { _id},
      {title} ,
      {
        new: true,
      }
    ).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
   if(point)
   {
    challengeModel
    .findOneAndUpdate(
      { _id},
      {point} ,
      {
        new: true,
      }
    ).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
   if(defValue.length)
   {
    challengeModel
    .findOneAndUpdate(
      { _id},
      {defValue} ,
      {
        new: true,
      }
    ).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
   if(input.length)
   {
    challengeModel
    .findOneAndUpdate(
      { _id},
      {input} ,
      {
        new: true,
      }
    ).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
   if(output.length)
   {
    challengeModel
    .findOneAndUpdate(
      { _id},
      {output} ,
      {
        new: true,
      }
    ).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
   if(!(active===null))
   {
    console.log("salam");
    challengeModel
    .findOneAndUpdate(
      { _id},
      {active} ,
      {
        new: true,
      }
    ).then((result) => {
      console.log("result",result)
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json("challenge not found");
    });
   }
    
  }
  //end editChall function

  //start confChall function
const confChall=(req,res)=>{
    const {point,level,active,_id}=req.body;
    challengeModel
      .findOneAndUpdate(
        { _id},
        {point,level,active,_id} ,
        {
          new: true,
        }
      ).then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json("challenge not found");
      });
  }
  //end confChall function


module.exports = {addChall,getAllChall,getChallengeByUser,getChallById,getChallbylevel,editChall,confChall,deleteChall};