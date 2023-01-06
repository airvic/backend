const mongoose = require ('mongoose');
const admin = new mongoose.Schema({
    username:{type:String},
   password:{type:String}
})




module.exports.getUserById = function(id,callback){
    Admin.findById(Id,callback)
}
// module.exports.getUserByUsername = function(username,callback){
//     const query = {username:username}
//     Admin.findOne(query,callback)
// }

//do compare functon here
module.exports.comparePassword= function(password1,password2){
    if(password1 == password2){
        return true
      
    }else{
        return false
    }

}

module.exports = mongoose.model('Admin',admin)