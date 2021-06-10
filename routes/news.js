const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = require('../models/News');


router.get('/', async (req, res) => {
    try{
        const news = await News.find()
        res.json(news)
    }catch(err){
        res.json(err)
    }
});

router.post('/', (req, res) => {
    console.log('request recieved');
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