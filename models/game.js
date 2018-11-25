var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    team: {
        type: String,
        required: true,
        trim: true
    },
    homegame: {
        type: Boolean,
        required: true
    },
    gameday: {
        type: String
    },
    result: {
        type: String
    },
    manofthematch: {
        type: String
    },
    goalsscored: {
        type: Number,
        default: 0
    },
    goalsconceded: {
        type: Number,
        default: 0
    },
    voted: {
        type: Boolean,
        default: false
    }
    , played: {
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

var Game = mongoose.model('Game', Schema);
module.exports = Game;
