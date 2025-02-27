const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    cost: { type: Number, required: true },
});

module.exports = mongoose.model('Game', GameSchema);