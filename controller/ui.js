const path  = require('path')
const UI_PATH = path.resolve(__dirname, '../views')+'/'

exports.loginPage = (req, res) => {
    res.sendFile(`${UI_PATH}login.html`)
}

exports.dashboardPageHome = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-home.html`)
} 

exports.dashboardPageShortener = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-shortener.html`)
} 

exports.dashboardPageForms = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-forms.html`)
} 

exports.dashboardPageAnalytics = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-analytics.html`)
} 

exports.dashboardPageUser = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-user.html`)
} 

exports.dashboardPageAdmin = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-admin.html`)
} 