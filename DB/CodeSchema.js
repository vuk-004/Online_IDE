const mongoose = require('mongoose')

const codeSchema = mongoose.Schema({
    lang: {
        type: String,
        required: true
    },
    content: {
        type: String,  
        required: true
    },
    filename: {
        type: String,
        required: true   
    }
})

module.exports = mongoose.model('Code', codeSchema)
