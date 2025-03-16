require('dotenv').config()
const mongoose = require('mongoose')


let isConnected = false;

const connectDb = async() => {
    try {
        const con = await mongoose.connect(process.env.mongodburl)
        console.log(`MongoDb connected ${con.connection.host}`)
        isConnected = true;
    }
    catch(err) {
        console.log(err.message);
        isConnected = false;
        process.exit(1)
    }
}


module.exports = {
    connectDb,
    isDbConnected: () => isConnected
}