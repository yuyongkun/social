const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('./db').secretOrKey;
require('../model/User');
const User = mongoose.model('users');
module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id).then((user) => {
            if (user) {
                done(null, user);
            }
            done(null, false);
        }).catch(err => {
            console.log(err)
        });
    }));
}