const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require

//VALIDATION
const Joi = require('@hapi/joi');

const scheme = {
    name: Joi.string().min(6).required(),
    email: Joi.string.min(6).required().email(),
    password: Joi.string.min(6).required(),
}

router.post('/register', (req, res) => {
    const {error} = Joi.validate(req.body, scheme);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    
    user.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});


module.exports = router;