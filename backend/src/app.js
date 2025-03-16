const express = require("express");
const cors = require("cors");
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    const status = db.isDbConnected() ? 'connected' : 'disconnected';
    res.json({
        message: `Welcome to the API`,
        database: {
            status: status
        }
    });
});

app.get('/ping', (req, res) => {
    res.send('pong')
});

module.exports = app