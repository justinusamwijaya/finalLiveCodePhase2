const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    blogs:[{type:Schema.Types.ObjectId,ref:'Blog'}],
},{ timestamps:true })

const User = mongoose.model('User',userSchema)

module.exports = { User, userSchema }