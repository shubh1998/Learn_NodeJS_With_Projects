const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, maxlength: 32, trim: true },
    age: { type: Number, default: 0 },
    user_status: { type: Boolean, default: true }
})

module.exports = User