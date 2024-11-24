const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requie: true
    },
    email: {
        type: String,
        requie: true,
        unique: true
    },
    name: {
        type: String,
        requie: true
    },
});

const User = mongoose.model('user', UserSchema);

model.exports = User;