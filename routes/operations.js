const express = require('express')
const ui = require('../controller/ui')
const userCon = require('../controller/user')
const router = express.Router()

router.get('/login', ui.loginPage)

router.post('/login', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
})

router.post('/addUser', (req, res) => {
    userCon.addUser(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.post('/delUser', (req, res) => {

})

router.post('/updateUser', (req, res) => {

})

router.get('/getAllUser', (req, res) => {

})

module.exports = router