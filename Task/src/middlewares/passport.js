require("dotenv").config();
const User = require("../models/User");

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "xIMEE1vdvlvTjac1tGyiJHZusIFBtl";
opts.passReqToCallback = true; //lets you access the http-request in callback
opts.failWithError = true;

passport.use(
    new JwtStrategy(opts, async function (req, jwt_payload, done) {
        // console.log(req.headers);
        //remove Bearer and fetch the naked JWT
		let token = req.headers.authorization.split(' ')[1];
        // console.log(token, jwt_payload);
        let user;
        
        if (jwt_payload.role && jwt_payload.role) {
            user = await User.findOne({auth_token: token})
        }
        if (user) {
            return done(null, user);
        } else {
            return done(unauthorizedError("Authentication Failure"));
        }
    })
)