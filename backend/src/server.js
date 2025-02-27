require('dotenv').config();
const app= require('./app')
require('./config/db')

const port=5000


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})