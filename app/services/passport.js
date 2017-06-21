'use strict';
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-auth').Strategy;
const config = require('../../config/config.js');

passport.use(new GoogleStrategy({
        clientId: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        scope: config.google.scope
    },
    function(accesToken, refreshToken, params, profile, done) {
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            name: profile.name,
            gender: profile.gender,
            photos: profile.photos,
            accesToken: accesToken,
            refreshToken: refreshToken
        };
        console.log('Name : '+profile.displayName);
        return done(null, user);
    }
    ));


passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(async function(user, done) {
    done(null, user);
})

module.export = passport;
