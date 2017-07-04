'use strict';

const config = require('../../config/config');
const passport = require('./passport');
const Router = require('koa-router');
const userRoutes = require('../user');
const YoutubeAPI = require('./youtube');
const Playlists = require('../models/playlist');

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
<<<<<<< HEAD
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
    youtubeAPI.getPlaylists();
  await ctx.render('playlist', {title: "Playlist page"});
});

router.get('/playlist-page', async function (ctx) {
=======
    const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
    const playlists = await youtubeAPI.getPlaylists();
    let myPlaylist;
    let myPlaylistVids = [];
    for(var a = 0; a < playlists.items.length; a++)
    {
      myPlaylist = playlists.items[a];
      myPlaylistVids.push(await youtubeAPI.getPlaylistItems(myPlaylist.id));
    }
    console.log(myPlaylistVids);
      await ctx.render('playlist', {title: "Playlist page", playlist: myPlaylist, videos: myPlaylistVids });
});

router.get('/playlist-page', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  const videoAdd = await youtubeAPI.addVideoToPlaylist('PL5Hd9Buq4RCHps1mN3je3VGiXAhQWDaRv', 'EzfPo7LyDys');
>>>>>>> 1be39b0e76f71fea91f47e4ba0ccfb7a17c51e4d
  await ctx.render('playlist-page', {title: "Playlist page"});
});

router.get('/create-playlist', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
<<<<<<< HEAD
  //youtubeAPI.createPlaylist(name);
=======
  const newPlaylist = await youtubeAPI.createPlaylist("Armen test");
>>>>>>> 1be39b0e76f71fea91f47e4ba0ccfb7a17c51e4d
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
