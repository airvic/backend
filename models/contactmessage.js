const mongoose = require ('mongoose');
const message = new mongoose.Schema({
    Name:{type:String,required:true},
   Email:{type:String,required:true},
   message:{type:String,required:true}
},{timestamps:true})


module.exports = mongoose.model('Message',message)