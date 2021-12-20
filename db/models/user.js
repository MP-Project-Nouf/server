const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstname:{type:String, required:true},
  lastname:{type:String, required:true},
  email:{type: String, required: true ,unique:true},
  username:{type: String, required: true ,unique:true},
  password:{type: String, required: true },
  role: {type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  phone:{type:Number , required:true},
  avatar:{type:String},
  rand:{type:Number},
  pirth:{type: Date},
  country:{type: String},
  city:{type: String},
  nationality:{type: String},
  gender:{type: String},
  workStatus:{type: String},
  github:{type: String},
  stackflow:{type: String},
  website:{type: String},
  twitter:{type: String},
  linkedin:{type: String},
  faveLang:{type: Array},
  education:{type: Array},
  training:{type: Array},
  interest:{type: Array},
  isDel:{type: Boolean , default:false},
  isActive:{type: Boolean ,default:false},
  point:{type: Number ,default:10},
  level:{type: Number ,default:1}

});

module.exports = mongoose.model("User", user);