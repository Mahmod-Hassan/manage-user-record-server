const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    city: String,
    gender: String,
    heardAbout: [String],
    state: String,
})
module.exports = userSchema;
