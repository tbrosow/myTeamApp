var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = new mongoose.Schema({
  shirt: {
    type: Number,
    unique: false,
    required: true,
    trim: true
  },
  firstname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    unique: false,
    required: true,
    trim: true
  }, domain: {
        id: {
            type: String
        },
        display: {
            type: String
        }
    }
});

var Player = mongoose.model('Player', Schema);
module.exports = Player;
