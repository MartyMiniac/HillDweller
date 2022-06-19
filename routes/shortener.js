const express = require('express')
const auth = require('../controller/auth')
const linkCon = require('../controller/shortener')

const router = express.Router()

router.post('/createLink', auth.isAuthenticated, (req, res) => {
    if(req.body.url===undefined || req.body.shortLink===undefined) {
        return res.status(400).json({
            success: false,
            msg: 'Expected url and shortLink parameters in the json'
        })
    }
    linkCon.createLink(req.body.url, req.body.shortLink)
    .then(data => {
        return res.sendStatus(200)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.post('/linkAvailable', auth.isAuthenticated, (req, res) => {
    if(req.body.shortLink===undefined) {
        return res.status(400).json({
            success: false,
            msg: 'Expected shortLink parameters in the json'
        })
    }
    linkCon.checkAvailablity(req.body.shortLink)
    .then(data => {
        return res.json({
            success: true,
            data: data
        })
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.get('/getMyLinks', auth.isAuthenticated, (req, res) => {
    linkCon.getUserGenerateLinks(req.id)
    .then(data => {
        return res.json(data)
    })
})

router.post('/deleteLink', auth.isAuthenticated, (req, res) => {
    if(req.body.id===undefined) {
        return res.status(400).json({
            success: false,
            msg: 'Expected id parameters in the json'
        })
    }
    linkCon.deleteLink(req.body.id, req.id)
    .then(data => {
        if(data===true) {
            return res.json({
                success: true,
                msg: 'Link Deleted Successfuly'
            })
        }
        else {
            return res.json({
                success: false,
                msg: 'Failed to delete the link, due users\'s lacking of required permissions'
            })
        }
    })
    .catch(err => {
        return res.status(404).json({
            success: false,
            msg: 'Link not found'
        })
    })
})

module.exports = router