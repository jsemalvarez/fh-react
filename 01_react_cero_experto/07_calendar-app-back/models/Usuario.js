const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        requie: true,
        uniqued: true
    },
    password: {
        type: String,
        requied: true
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;