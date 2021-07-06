const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true,
        integer: true
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true,
        integer: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);