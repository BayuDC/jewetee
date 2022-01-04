const User = require('../models/user');

module.exports = {
    async signup(req, res) {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });

        return res.status(201).json({ user });
    },
};
