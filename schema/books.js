const mongoose = require('mongoose')

const bookData = new mongoose.Schema({
    title: {
        type: String
    },
    isbn: {
        type: String
    },
    authors: {
        type: String
    },
    description: {
        type: String
    }
})
module.exports = mongoose.model('bookData', bookData)