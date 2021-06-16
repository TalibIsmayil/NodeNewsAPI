const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = require('../models/News');
const verify = require('./verifyToken');

const homePage = {
    advertisments: [
        {
            id: 1,
            title: "Super Flash Sale 50% Off",
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGUlMjBzaG9lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            date: "08:34:52"
        },
        {
            id: 2,
            title: "Mega Sale 80% Off",
            image: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg",
            date: "21:14:43"
        },
    ],
    categories: [
        {
            id: 1,
            title: "Super Flash Sale 50% Off",
            icon: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGUlMjBzaG9lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        },
        {
            id: 2,
            title: "Mega Sale 80% Off",
            icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
        },
    ],
    items: [
        {
            title: "Flash Sale",
            products: [
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                },
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                },
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                }
            ]
        },
        {
            title: "Mega Sale",
            products: [
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                },
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                },
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                }
            ]
        },
        {
            title: "Recomended Product",
            products: [
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                },
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                },
                {
                    id:1,
                    title: "",
                    image: "",
                    rating: 4.7,
                    price: 534.33,
                    discountPrice: 299.43,
                    discountPercent: 24
                }
            ]
        }
    ]
}

router.get('/home-page', verify, async (req, res) => {
    res.json(homePage);
});

router.post('/', (req, res) => {
    const news = new News({
        title: req.body.title,
        url: req.body.url,
        urlToImage: req.body.imageUrl,
        publishedAt: Date.now()
    });
    news.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});



module.exports = router;