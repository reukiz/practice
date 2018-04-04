var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema ({
    text: String
});

module.exports = mongoose.model('Content', contentSchema);