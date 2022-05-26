const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)
const db = mongoose.connection

db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Webserver listening at PORT ${PORT}`)
    })
})

db.on('error', () => {
    console.log('Error connecting database')
})