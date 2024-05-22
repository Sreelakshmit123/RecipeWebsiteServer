const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    gender:{
        type:String,   
    },
    profile:{
        type:String
    },
    facebook:{
        type:String      
    },
    instagram:{
        type:String
    }
})


const users = mongoose.model('users',userSchema)

module.exports = users