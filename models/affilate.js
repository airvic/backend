const mongoose = require ('mongoose');
const affilate = new mongoose.Schema({
  link:{type:String,required:true}
})


module.exports = mongoose.model('Affilate',affilate)