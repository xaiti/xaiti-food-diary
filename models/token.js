const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userID: { type: String, Required: true },
    userEmail: { type: String, Required: true },
    token: { type: String, Required: true },
    createDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Token', tokenSchema)