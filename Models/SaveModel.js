const mongoose = require('mongoose')

const saveRecipeschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true  
    },
    ingredients:{
        type:Array,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
    instructions:{
        type:Array,
        required:true
    },
    cookingTime:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },  
    userId:{
        type:String,
        required:true

    } 
})

const saves = mongoose.model("saves",saveRecipeschema)
module.exports = saves