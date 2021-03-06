const jwt = require('jsonwebtoken');
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, 'thisisdemoproject');
        const user = User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user) throw new Error();

        req.user = user;
        next();
    } catch (error) {
        
    }
}

module.exports = auth;