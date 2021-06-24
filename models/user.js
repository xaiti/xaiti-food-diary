const mongoose = require('mongoose')

var stringRequired = { type: String, required: true }

const userSchema = new mongoose.Schema({
    name: stringRequired,
    email: stringRequired,
    password: stringRequired,
    breakfast: [ ],
    lunch: [ ],
    dinner: [ ],
    snack: [ ],
})

module.exports = mongoose.model('User', userSchema)