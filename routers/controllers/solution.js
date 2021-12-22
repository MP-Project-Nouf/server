const solutionModel = require("./../../db/models/solution");

//start addsolution function
const addsolution = (req, res) => {
  const { image, username, solve, challenge,point,title } = req.body;
  const userId = req.token.id;
  const newSolutionModel = new solutionModel({
    image,
    username,
    solve,
    challenge,
    point,
    title,
    user: userId,
  });
  newSolutionModel
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//end addsolution function

//start getSoulByuser function
const getSoulByuser = (req, res) => {
    const { user } = req.params;
    solutionModel
      .find({ user })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json("not found any solution");
        }
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).json(err);
      });
  };
  //end getSoulByuser function

//start getSoulByChall function
const getSoulByChall = (req, res) => {
  const { chall } = req.params;
  solutionModel
    .find({ challenge: chall })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("not found any solution");
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json(err);
    });
};
//end getSoulByChall function

module.exports = { addsolution, getSoulByChall,getSoulByuser };
