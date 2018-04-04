var mongoose = require('mongoose'),
    Content  = require('../models/content');

var headlineSchema = new mongoose.Schema ({
    title: String,
    contents: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Content'
        }
    ]
});

module.exports = mongoose.model('Headline', headlineSchema);


