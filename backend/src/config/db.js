require('dotenv').config()
const mongoose = require('mongoose')

const connectDb = async()=>{
    try{
        const con= await mongoose.connect(process.env.mongodburl)
        console.log(`MongoDb connected ${con.connection.host}`)
    }
    catch(err){
        console.log(err.message);
        process.exit(1)
    }
}