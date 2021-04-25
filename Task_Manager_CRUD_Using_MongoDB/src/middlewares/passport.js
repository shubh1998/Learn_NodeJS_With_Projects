require("dotenv").config();
// const AuthTable = require("../models/AuthTable");

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
        // console.log(token)
        let user;
        
        if (jwt_payload.role && jwt_payload.role) {
            // user = await AuthTable.query().eager("auth_user_relation").modifyEager("auth_user_relation",builder => {
            //     return builder.select("email", "mobile", "first_name", "last_name", "restaurant_name", "user_type", "user_status", "date_of_birth", "login_type", "is_email_verified");
            // }).where({ "auth_token": token }).first();
        }
        if (user) {
            return done(null, user);
        } else {
            return done(unauthorizedError("Authentication Failure"));
        }
    })
)