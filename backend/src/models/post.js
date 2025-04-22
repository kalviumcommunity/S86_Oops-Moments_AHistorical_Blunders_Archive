const { string, required, number } = require('joi')
const mongoose=require('mongoose')
const User = require('./user')

const postschema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    timeperiod:{type:Number,required:true,min:1},
    author:{type:mongoose.Schema.ObjectId,ref:'User'}
})

module.exports= mongoose.model('Posts',postschema)