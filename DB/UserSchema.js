const mongoose = require("mongoose");
const Code = require("./CodeSchema"); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide username'],
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    codes: [Code.schema] 
});

module.exports = mongoose.model('User', userSchema);
