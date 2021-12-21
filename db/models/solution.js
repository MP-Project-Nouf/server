const mongoose = require("mongoose");

const solution = new mongoose.Schema({
    image:{type:String},
    username:{type:String,required: true},
    solve:{type:String, required: true},
    date:{type:Date , default:new Date},
    challenge: {type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Solution", solution);