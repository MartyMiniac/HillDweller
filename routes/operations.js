const express = require('express')
const ui = require('../controller/ui')
const userCon = require('../controller/user')
const router = express.Router()
const auth = require('../controller/auth')

router.get('/login', ui.loginPage)

router.post('/login', (req, res) => {
    if(req.body.username===undefined || req.body.password===undefined) {
        return res.status(400).json({
            msg: 'expected username and password'
        })
    }
    userCon.checkLogin(req.body.username, req.body.password)
    .then(data => {
        if(data.success===true) {
            res.cookie('jwt', data.jwt)
            return res.redirect('/o/dashboard')
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

router.get('/dashboard', ui.dashboardPage)

router.post('/addUser', (req, res) => {
    if(req.body.name===undefined || req.body.username===undefined || req.body.password===undefined) {
        return res.status(400).json({
            msg: 'expected name, username and password'
        })
    }
    userCon.addUser(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.post('/delUser', (req, res) => {
    if(req.body.uid===undefined) {
        return res.status(400).json({
            msg: 'expected uid'
        })
    }
    userCon.delUser(req.body.uid)
    .then(data => {
        return res.json(data)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.post('/updateUser', (req, res) => {
    if(req.body.uid!==undefined && (req.body.name!==undefined || req.body.role!==undefined || req.body.username!==undefined || req.body.password!==undefined)) {
        userCon.updateUser(req.body)
        .then(data => {
            return res.send('data updated')
        })
        .catch(err => {
            console.log(err)
            return res.sendStatus(500)
        })
    }
    else {
        return res.status(400).json({
            msg: 'expected uid and (name or username or password)'
        })
    }
})

router.get('/getAllUser', (req, res) => {
    userCon.getAllUser().then(data => {
        return res.json(data)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

module.exports = router