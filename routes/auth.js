const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//VALIDATION
const Joi = require('@hapi/joi');

const scheme = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
}

const scheme2 = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
}

router.post('/register', async (req, res) => {
    //const {error} = Joi.validate(req.body, scheme);
    //if (error) return res.status(400).send(error.details[0].message);

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

router.post('/login', async (req, res) => {
    //const {error} = Joi.validate(req.body, scheme2);
    //if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id}, 'myStrongSecret123');
    res.json({token: token});
});


module.exports = router;