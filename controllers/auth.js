const User = require('../models/user');

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

            res.status(201).json({ user });
        } catch (err) {
            res.status(400).json({ err: parseError(err) });
        }
    },
};
