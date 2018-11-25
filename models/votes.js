var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    gold: {
        type: String,
        required: false,
        trim: true
    },
    silver: {
        type: String,
        required: false,
        trim: true
    },
    bronze: {
        type: String,
        required: false,
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
    },
    not_played: {
        type: Boolean,
        default: false
    },
    domain: {
        id: {
            type: String
        },
        display: {
            type: String
        }
    }

});

var Vote = mongoose.model('Vote', Schema);
module.exports = Vote;
