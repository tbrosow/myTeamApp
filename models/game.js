var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = new mongoose.Schema({
  number: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  oponent: {
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
    type: Number
    },
    goalsconceded: {
    type: Number
    }

});

var Game = mongoose.model('Game', Schema);
module.exports = Game;
