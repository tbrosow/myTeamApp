var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        trim: true
    }

});

var Property = mongoose.model('Property', Schema);
module.exports = Property;
