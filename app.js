const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/static', express.static('static'))
//operations
app.use('/', require('./routes/operations'))
//forms
app.use('/f', require('./routes/operations'))
//link shortener
app.use('/s', require('./routes/shortener-pub'))
//analystics
app.use('/a', require('./routes/operations'))

//api
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/shortener', require('./routes/shortener'))

app.get('*', (req, res) => {
    res.sendStatus(404)
})

module.exports = app