const express = require("express");
const cors = require("cors");
const db = require('./config/db');
const userRouter=require('./routes/userRoutes')
const postRouter=require('./routes/Postroute')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth',userRouter)
app.use('/post',postRouter)



module.exports = app;