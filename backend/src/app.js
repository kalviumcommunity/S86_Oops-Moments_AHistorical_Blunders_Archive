const express = require("express");
const cors = require("cors");
const db = require('./config/db');
const userRouter=require('./routes/userRoutes')
const postRouter=require('./routes/Postroute')
const cookieParser=require('cookie-parser')

const app = express();
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  
  
app.use(express.json());



app.use('/auth',userRouter)
app.use('/post',postRouter)



module.exports = app;