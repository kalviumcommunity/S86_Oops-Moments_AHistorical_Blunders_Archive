require('dotenv').config();
const app = require('./app')
const db = require('./config/db')

const port = 5000
db.connectDb();

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})