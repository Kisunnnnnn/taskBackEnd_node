const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config({ path: './config/config.env' })
const db = process.env.DATABASE

mongoose.connect(db).then(() => {
    console.log("Database Connected")
}).catch(err => console.log(err))

const app = express()
app.use(bodyparser.json())
app.use(cors())
app.use('/', require('./routes/tasks'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server started on PORT ", PORT)
})