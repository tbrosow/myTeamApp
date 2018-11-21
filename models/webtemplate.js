var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    html: {
        type: String,
        required: true,
        trim: true
    }
});

var WebTemplate = mongoose.model('WebTemplate', Schema);
module.exports = WebTemplate;
