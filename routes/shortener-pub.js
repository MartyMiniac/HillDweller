const express = require('express')
const linkCon = require('../controller/shortener')

const router = express.Router()

router.get('/:shortLink', (req, res) => {
    linkCon.getUrl(req.params.shortLink)
    .then(data => {
        if(data!==null) {
            return res.redirect(data)
        }
        else {
            return res.sendStatus(404)
        }
    })
    .catch(err => {
        return res.sendStatus(500)
    })
})

module.exports = router