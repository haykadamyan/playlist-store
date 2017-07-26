'use strict';
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const models = require('./models');
const config = require('../../config/config');

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function (accessToken, refreshToken, params, profile, done) {
    let user = {
      googleId: profile.id,
      displayName: profile.displayName,
      idToken: params.id_token,
      accessToken: accessToken
    };

    if (refreshToken) {
      user.refreshToken = refreshToken;
    }
    models.User.upsert(user)
      .then(function () {
        return done(null, user);
      });
    console.log('Name : ' + profile.displayName);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.googleId);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await models.User.findOne({where: {googleId: id}});
    if (user) {
      done(null, user.get({plain:true}));
    } else {
      done(null, null);
    }
  } catch(err){
    done(err, null);
  }
});

module.exports = passport;
