var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
var User = require('../models/User');

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.passReqToCallback = true; //lets you access the http-request in callback
opts.failWithError = true;

passport.use(new JwtStrategy(opts, async function (req, jwt_payload, done) {
    //remove Bearer and fetch the naked JWT
    let token = req.headers.authorization.split(' ')[1];
    
    let user;

    //tokens are stored and deleted at server-side for single log-on sessions.
    // if (jwt_payload.role && jwt_payload.role === 'Admin') {
    //     user = await Admin.query().where({ "auth_token": token, "id": jwt_payload.id }).first();
    // } else 
    if (jwt_payload.role && jwt_payload.role === 'USER') {
        user = await User.query().where({ "auth_token": token, "id": jwt_payload.id }).first();
    }
    if (user) {
        return done(null, user);
    } else {
        return done(unauthorizedError("Authentication Failure"));
    }
}));
