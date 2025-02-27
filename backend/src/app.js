const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.get('/ping',(req,res)=>{
    res.send('pong')
})