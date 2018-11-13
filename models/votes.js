var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    gold: {
        type: String,
        required: true,
        trim: true
    },
    silver: {
        type: String,
        required: true,
        trim: true
    },
    bronze: {
        type: String,
        required: true,
        trim: true
    },
    voter: {
        type: String,
        required: true,
        trim: true
    },
    game: {
        type: String,
        required: true,
        trim: true
    }

});

var Vote = mongoose.model('Vote', Schema);
module.exports = Vote;
