const path  = require('path')
const UI_PATH = path.resolve(__dirname, '../views')+'/'

exports.loginPage = (req, res) => {
    res.sendFile(`${UI_PATH}login.html`)
}

exports.dashboardPage = (req, res) => {
    res.sendFile(`${UI_PATH}dashboard-home.html`)
} 