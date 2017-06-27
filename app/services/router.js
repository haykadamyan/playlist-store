'use strict';

const config = require('../../config/config');
const passport = require('./passport');
const Router = require('koa-router');
const userRoutes = require('../user');
const YoutubeAPI = require('./youtube');

const router = new Router();

const payment = {
  seller: "Bobo",
  playlist: "Rock-playlist",
  purchase: "0.99$"
};

router.get('/', async function (ctx) {
  await ctx.render('main');
});

router.get('/payment', async function (ctx) {
  await ctx.render('payment', {payment: payment});
});

router.get('/playlist', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
    youtubeAPI.getPlaylists();
  await ctx.render('playlist', {title: "Playlist page"});
});

router.get('/playlist-page', async function (ctx) {
  await ctx.render('playlist-page', {title: "Playlist page"});
});

router.get('/create-playlist', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  //youtubeAPI.createPlaylist(name);
  await ctx.render('create-playlist', {title: "Create playlist"});
});

router.get('/auth/youtube',
  passport.authenticate('google',
      {scope: config.google.scope, accessType: config.google.accessType, approvalPrompt: config.google.approvalPrompt}
    )
);

router.get('/auth/youtube/callback',
  passport.authenticate('google',
      {successRedirect: '/playlist', failureRedirect: '/'}
    )
);

router.use(async function(ctx, next){
  if (ctx.isAuthenticated()){
    return next()
  } else {
    ctx.redirect('/')
  }
});

module.exports = router;
