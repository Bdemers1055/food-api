const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema class

const foodSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    foodGroup: {
        type: String,
        required: true,
    }
});

const Food = mongoose.model('Food', foodSchema );

module.exports = Food;