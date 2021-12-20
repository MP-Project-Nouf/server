const mongoose = require("mongoose");

const training = new mongoose.Schema({
    center:{type:String, required: true},
    certificate:{type:String , required: true},
    begining:{type:String, required: true},
    end:{type:Date , required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Training", training);