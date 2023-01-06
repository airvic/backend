const mongoose = require ('mongoose');
const traffic = new mongoose.Schema({
    count:{type:Number}
},{timestamps:true})


module.exports = mongoose.model('Traffic',traffic)