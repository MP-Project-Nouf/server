const mongoose = require("mongoose");

const comment = new mongoose.Schema({
    image:{type:String},
    username:{type:String,required: true},
    disc:{type:String, required: true},
    date:{type:Date , default:new Date},
    challenge: {type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Comment", comment);