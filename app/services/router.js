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
    //const playlists = await Playlists.getMyPlaylists(ctx.state.user.accessToken, ctx.state.user.refreshToken);
    const playlists = await youtubeAPI.getPlaylists();
    const myPlaylist = playlists.items[0];
    const myPlaylistVids = await youtubeAPI.getPlaylistItems(myPlaylist.id);
    await ctx.render('playlist', {title: "Playlist page", playlist: myPlaylist, videos:myPlaylistVids.items });
});

router.get('/playlist-page', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  const videoAdd = await youtubeAPI.addVideoToPlaylist('PL5Hd9Buq4RCHps1mN3je3VGiXAhQWDaRv', 'EzfPo7LyDys');
  await ctx.render('playlist-page', {title: "Playlist page"});
});

router.get('/create-playlist', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  const newPlaylist = await youtubeAPI.createPlaylist("Armen test");
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
