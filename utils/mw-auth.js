const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.SECRET ?? 'A';

module.exports = {
    async getUserInfo(req, res, next) {
        try {
            let token = req.cookies.token;
            if (!token) throw token;

            token = await jwt.verify(token, secret);
            res.locals.user = await User.findById(token.user);
        } catch (e) {
            res.locals.user = null;
        }

        next();
    },
};
