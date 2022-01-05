const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Email is not valid!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password at least 8 characters!'],
    },
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.statics.login = async function (email, password) {
    if (!isEmail(email)) throw { email: 'Email is not valid!' };

    const user = await this.findOne({ email });
    if (!user) throw { email: 'Email is not registered!' };

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw { password: 'Incorrect password!' };

    return user;
};

module.exports = mongoose.model('User', userSchema);
