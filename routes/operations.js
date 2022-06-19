const express = require('express')
const ui = require('../controller/ui')
const router = express.Router()
const auth = require('../controller/auth')

router.get('/login', ui.loginPage)

router.get('/dashboard/home', auth.isAuthenticated, ui.dashboardPage)

router.get('/dashboard', (req, res) => {
    return res.redirect('/dashboard/home')
})

module.exports = router