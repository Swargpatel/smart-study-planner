const mpngoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// This code is used for encrypt password before saving it that i have researched
userschema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

userschema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userschema);