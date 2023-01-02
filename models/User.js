const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("User",UserSchema)