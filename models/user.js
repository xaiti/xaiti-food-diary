const mongoose = require('mongoose')

var stringRequired = { type: String, required: true }

const userSchema = new mongoose.Schema({
    name: stringRequired,
    email: stringRequired,
    password: stringRequired
})

module.exports = mongoose.model('User', userSchema)