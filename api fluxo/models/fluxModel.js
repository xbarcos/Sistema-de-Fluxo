const mongoose = require('mongoose')

const fluxSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        bank: {
            type: String,
            required: true
        },
        situation: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        accomplished: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Flux = mongoose.model('Flux', fluxSchema);

module.exports = Flux;