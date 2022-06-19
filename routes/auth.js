const express = require('express')
const userCon = require('../controller/user')

const router = express.Router()

router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken')
    res.redirect('/login')
})

router.post('/login', (req, res) => {
    if(req.body.username===undefined || req.body.password===undefined) {
        return res.status(400).json({
            msg: 'expected username and password'
        })
    }
    userCon.checkLogin(req.body.username, req.body.password)
    .then(data => {
        if(data.success===true) {
            res.cookie('jwtToken', data.jwt)
            return res.redirect('/dashboard')
        }
        else {
            return res.sendStatus(401)
        }
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

module.exports = router