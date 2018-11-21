var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }

});

var Domain = mongoose.model('Domain', Schema);
module.exports = Domain;
