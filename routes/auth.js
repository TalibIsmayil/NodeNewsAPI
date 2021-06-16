const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//VALIDATION
const Joi = require('@hapi/joi');

const scheme = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const scheme2 = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
    const {error} = scheme.validate(req.body);
    if (error) return res.status(400).json({message: error.message});

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
    const {error} = scheme2.validate(req.body);
    if (error) return res.status(400).json({message: error.message});

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id}, 'myStrongSecret123',{
        expiresIn: '90d',
      });
    res.json({name: user.name,
        token: token});
});


module.exports = router;