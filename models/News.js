const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    urlToImage: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('News', NewsSchema);