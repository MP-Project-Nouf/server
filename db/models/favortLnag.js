const mongoose = require("mongoose");

const favoritLng = new mongoose.Schema({
  language:{type:String, required: true},
  expertise:{type:String , required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 
});

module.exports = mongoose.model("FavoritLang", favoritLng);