const mongoose = require("mongoose");

const education = new mongoose.Schema({
    level:{type:String, required: true},
    college:{type:String , required: true},
    speciall:{type:String, required: true},
    enrollment:{type:Date , required: true},
    graduation:{type:Date , required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

});

module.exports = mongoose.model("Education", education);