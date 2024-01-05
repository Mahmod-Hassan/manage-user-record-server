
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    gender: {
        type: String,
    },
    heardAbout: {
        type: [String],
    },
    state: {
        type: String
    }
});

module.exports = userSchema;
