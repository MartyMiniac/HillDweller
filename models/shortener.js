const mongoose = require('mongoose')

const shortenerSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        unique: true,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

const shortener = mongoose.model('shortener', shortenerSchema)
module.exports = shortener