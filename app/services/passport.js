'use strict';
const passport = require('koa-passport');
const models = require('./models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../../config/config');

passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
  },
    function(accessToken, refreshToken, params, profile, done) {
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            name: profile.name,
            gender: profile.gender,
            photos: profile.photos,
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        models.User.upsert({where:{googleId: user.id}, defaults: {displayName: user.displayName, accessToken: accessToken, refreshToken: refreshToken, idToken: params.id_token, googleId: user.id}})
        .then(function(){
          return done(null, user);
        });
        console.log('Name : ' + profile.displayName);
    }
    ));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    done(null, user);
});

module.exports = passport;
