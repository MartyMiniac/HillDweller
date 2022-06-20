const express = require('express')
const linkCon = require('../controller/shortener')

const router = express.Router()

router.get('/:shortLink', (req, res) => {
    linkCon.getUrl(req.params.shortLink)
    .then(data => {
        if(data!==null) {
            let url = data
            if(!url.startsWith('http')) {
                url='http://'+url
            }
            return res.redirect(url)
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