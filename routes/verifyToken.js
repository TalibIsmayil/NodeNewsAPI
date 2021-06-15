const { func } = require('@hapi/joi');
const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token,'myStrongSecret123');
        req.user = verified;
    }catch{
        res.status(400).send('Invalid Token');
    }
}