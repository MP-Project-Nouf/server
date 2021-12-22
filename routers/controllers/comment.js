const commentModel = require("./../../db/models/comment");

//start addComment function
const addComment = (req, res) => {
  const { image, username, disc, challenge} = req.body;
  const userId = req.token.id;
  const newCommentModel = new commentModel({
    image,
    username,
    disc,
    challenge,
    user: userId,
  });
  newCommentModel
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
        console.log("err",err);
      res.status(400).json(err);
    });
};
//end addComment function

//start getSoulByuser function
// const getSoulByuser = (req, res) => {
//     const { user } = req.params;
//     solutionModel
//       .find({ user })
//       .then((result) => {
//         if (result) {
//           res.status(200).json(result);
//         } else {
//           res.status(404).json("not found any solution");
//         }
//       })
//       .catch((err) => {
//         console.log("err", err);
//         res.status(400).json(err);
//       });
//   };
  //end getSoulByuser function

//start getcommentByChall function
const getcommentByChall = (req, res) => {
  const { chall } = req.params;
  commentModel
    .find({ challenge: chall })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("not found any comment");
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json(err);
    });
};
//end getcommentByChall function

module.exports = { addComment,getcommentByChall };