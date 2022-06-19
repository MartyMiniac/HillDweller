const express = require('express')
const ui = require('../controller/ui')
const router = express.Router()
const auth = require('../controller/auth')

router.get('/login', ui.loginPage)

router.get('/dashboard', (req, res) => {
    return res.redirect('/dashboard/home')
})

router.get('/dashboard/home', auth.isAuthenticated, ui.dashboardPageHome)

router.get('/dashboard/shortener', auth.isAuthenticated, ui.dashboardPageShortener)

router.get('/dashboard/forms', auth.isAuthenticated, ui.dashboardPageForms)

router.get('/dashboard/analytics', auth.isAuthenticated, ui.dashboardPageAnalytics)

router.get('/dashboard/user', auth.isAuthenticated, ui.dashboardPageUser)

router.get('/dashboard/manage', auth.isAuthenticated, ui.dashboardPageAdmin)


module.exports = router