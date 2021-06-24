const mongoose = require('mongoose')

const foodEntrySchema = new mongoose.Schema({
    user_id: { type: String },
    date: { type: Date },
    food: { 
        breakfast: [ ],
        lunch: [ ],
        dinner: [ ],
        snack: [ ]
    },
    water: { type: Number },
    exercise: { }
})

module.exports = mongoose.model('FoodEntry', foodEntrySchema)