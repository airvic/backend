const mongoose = require ('mongoose');
const post = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    image1:{type:String},
    image2:{type:String},
    image3:{type:String},
    description:{type:String,required:true},
    author:{type:String},
    content:{type:String,required:true},
    content2:{type:String,required:true},
    content3:{type:String,required:true},
    category:{type:String,required:true}
},{timestamps:true})


module.exports = mongoose.model('Post',post)