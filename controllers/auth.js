const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.SECRET ?? 'A';
const maxAge = 24 * 60 * 60;

const parseError = err => {
    if (err.code == 11000) {
        return { email: 'Email already registered' };
    } else if (err.name == 'ValidationError') {
        const errors = {};
        Object.values(err.errors).forEach(error => {
            errors[error.path] = error.message;
        });
        return errors;
    }
};

module.exports = {
    async signup(req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await User.create({ name, email, password });
            const token = jwt.sign({ user: user._id }, secret, { expiresIn: maxAge });

            res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 100 });
            res.status(201).json({ user: user._id });
        } catch (err) {
            res.status(400).json({ err: parseError(err) });
        }
    },
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = jwt.sign({ user: user._id }, secret, { expiresIn: maxAge });

            res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 100 });
            res.status(200).json({ user });
        } catch (err) {
            res.status(400).json({ err });
        }
    },
};
