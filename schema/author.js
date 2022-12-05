const mongoose = require('mongoose')

const authorData = new mongoose.Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },

})
module.exports = mongoose.model('authorData', authorData)