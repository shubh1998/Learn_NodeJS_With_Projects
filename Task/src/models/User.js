const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    user_status: { type: Boolean, default: true },
    password: { type: String, required: true },
    user_approved: { type: Boolean, default: false },
    user_type: { type: String, required: true }, // BUSINESSUSER, CUSTOMERUSER
    email_verification_token: { type: String },
    is_email_verified: { type: Boolean, default: false },
    auth_token: { type: String },
    location: {type: String},
    postal_code: {type:String},
    city: { type: String },
    country: { type: String },
});

const User = mongoose.model('User', userSchema)

module.exports = User