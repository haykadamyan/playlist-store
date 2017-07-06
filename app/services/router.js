'use strict';

const config = require('../../config/config');
const passport = require('./passport');
const Router = require('koa-router');
const YoutubeAPI = require('./youtube');
const Sync = require('./sync');
const models = require('./models');

const router = new Router();
const Playlist = models.Playlist;


const payment = {
  seller: "Bobo",
  playlist: "Rock-playlist",
  purchase: "0.99$"
};

router.get('/', async function (ctx) {
  await Sync.playlists(ctx.state.user);

  const playlists = await Playlist.findAll();
    await ctx.render('main', {title: "Playlist Store", playlists: playlists});
});

router.get('/payment', async function (ctx) {
  await ctx.render('payment', {payment: payment});
});

router.get('/playlist', async function (ctx) {

  const playlistsArmen = Sync.playlists(ctx.state.user);

  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  const playlists = await youtubeAPI.getPlaylists();
  let myPlaylists = [];
  let myPlaylistVids = [];
  for (var a = 0; a < playlists.items.length; a++) {
    myPlaylists.push(playlists.items[a]);
    myPlaylistVids.push(await youtubeAPI.getPlaylistItems(myPlaylists[myPlaylists.length - 1].id));
    myPlaylistVids.push('end');
  }
  await ctx.render('playlist', {title: "Playlist page", playlist: myPlaylists, videos: myPlaylistVids});
});


router.get('/playlist-page', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  const videoAdd = await youtubeAPI.addVideoToPlaylist('PL5Hd9Buq4RCHps1mN3je3VGiXAhQWDaRv', 'EzfPo7LyDys');
  await ctx.render('playlist-page', {title: "Playlist page"});
});

router.get('/create-playlist', async function (ctx) {
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
  //youtubeAPI.createPlaylist(name);
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
    {successRedirect: '/', failureRedirect: '/armen'}
  )
);


router.get('/playlist/sell/:id', async function(ctx){
  console.log(typeof parseInt(ctx.params.id));
  const playlist = await Playlist.findById(parseInt(ctx.params.id));
  const update = await playlist.update({status:"for sale"});
  console.log(update);
});

router.use(async function (ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
});

module.exports = router;
