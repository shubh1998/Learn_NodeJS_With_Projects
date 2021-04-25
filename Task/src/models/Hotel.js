const mongoose = require('mongoose')

const Hotel = mongoose.model("Hotel", {
    hotel_name: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    postal_code: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
});

module.exports = Hotel