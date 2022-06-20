const linkMod = require('../models/shortener')
const userMod = require('../models/user')
const userCon = require('./user')

exports.createLink = (url, shortLink, username) => {
    return new Promise((resolve, refuse) => {
        userMod.findOne(username)
        .then(data => {
            const shortenedLink = new linkMod({
                url: url,
                shortLink: shortLink,
                creator: data._id
            })
            shortenedLink.save()
            .then(linkData => {
                resolve(linkData)
            })
            .catch(err => {
                refuse(err)
            })
        })
    })
}

exports.checkAvailablity = (link) => {
    return new Promise((resolve, refuse) => {
        linkMod.find({
            shortLink: link
        })
        .then(data => {
            if(data.length===0) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.getUrl = (shortLink) => {
    return new Promise((resolve, refuse) => {
        linkMod.findOneAndUpdate({
            shortLink: shortLink
        }, {
            $inc: {
                clicks: 1
            }
        })
        .then(data => {
            if(data) {
                resolve(data.url)
            }
            else {
                resolve(null)
            }
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.getUserGenerateLinks = (username) => {
    return new Promise((resolve, refuse) => {
        userMod.findOne({
            username: username
        })
        .then(data => {
            linkMod.find({
                creator: data._id
            })
            .then(dataLinks => {
                resolve(dataLinks)
            })
            .catch(err => {
                refuse(err)
            })
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.deleteLink = (linkId, username) => {
    return new Promise((resolve, refuse) => {
        linkMod.findById(linkId)
        .then(linkData => {
            userCon.checkPermission(username, linkData.creator, ['owner', 'coordinator', 'core'])
            .then(status => {
                if(status===true) {
                    linkMod.findByIdAndDelete(linkId)
                    .then(data => {
                        resolve(true)
                    })
                    .catch(err => {
                        refuse(err)
                    })
                }
                else {
                    resolve(false)
                }
            })
            .catch(err => {
                refuse(err)
            })
        })
        .catch(err => {
            refuse(err)
        })
    })
}