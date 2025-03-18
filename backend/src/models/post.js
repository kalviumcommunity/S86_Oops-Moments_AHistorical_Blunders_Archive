const { string, required, number } = require('joi')
const mongoose=require('mongoose')

const postschema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    timeperiod:{type:Number,required:true,min:1}
})

module.exports= mongoose.model('Posts',postschema)