const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    user_email: { type: String, required: true },
    date: { type: Date, required: true },
    food: { 
        breakfast: [ ],
        lunch: [ ],
        dinner: [ ],
        snack: [ ]
    },
    water: Number,
    exercise: { }
})

module.exports = mongoose.model('Entry', entrySchema)