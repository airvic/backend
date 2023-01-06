const mongoose = require ('mongoose');
const newsletter = new mongoose.Schema({
    lettername:{type:String,required:true},
    letteremail:{type:String,required:true}
  
})


module.exports = mongoose.model('Newsletter',newsletter)