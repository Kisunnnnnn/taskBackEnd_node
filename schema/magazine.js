const mongoose = require('mongoose')

const magazineData = new mongoose.Schema({
    title: {
        type: String
    },
    isbn: {
        type: String
    },
    authors: {
        type: String
    },
    publishedAt: {
        type: String
    }
})
module.exports = mongoose.model('magazineData', magazineData)