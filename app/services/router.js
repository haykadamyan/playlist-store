'use strict';

const Router = require('koa-router');

const config = require('../../config/config');
const passport = require('./passport');
const Sync = require('./sync');
const models = require('./models');
const pay = require('./pay');

const router = new Router();
const Playlist = models.Playlist;
const Sale = models.Sale;
const User = models.User;

router.get('/', async function (ctx) {
  if (!ctx.isAuthenticated()) {
    await ctx.render('login');
    return false;
  }
  await Sync.playlists(ctx.state.user);

  const playlists = await Playlist.findAll({where: {ownerId: ctx.state.user.id}});
  const storePlaylists = await Playlist.findAll({where: {status: "for sale", ownerId: {$not: ctx.state.user.id}}});

  await ctx.render('main', {
    title: "Playlist Store",
    playlists: playlists,
    storePlaylists: storePlaylists
  });
});

router.get('/ILPAuthenticate', async function (ctx) {
    let data = ctx.query;

    const user = await User.findById(ctx.state.user.id);

    await user.update({ILPUsername: data.username, ILPPassword: data.password});

    console.log(data);

    ctx.response.body = {status: 'success', message: "ILP address updated"};
});

router.get('/playlist/:id', async function (ctx) {
  const id = parseInt(ctx.params.id);
  const playlist = await Playlist.findById(id);
  const plainPlaylist = playlist.get({plain: true});
  const videosData = await ctx.state.youtubeAPI.getPlaylistItems(playlist.youtubeId);

  const videos = videosData.items.map((item) => {
    return item.snippet.title;
  });

  await ctx.render('playlist', {title: 'One playlist', playlist: plainPlaylist, videos: videos});
});
router.get('/userInfo', async function(ctx){
    await ctx.render('userInfo', {user: ctx.state.user});
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
router.get('/logout', function (ctx) {
    ctx.logout();
    ctx.redirect('/');
});
router.get('/playlist/sell/:id', async function (ctx) {
    const id = parseInt(ctx.params.id);
    const playlist = await Playlist.findById(id);
    if (playlist.get('ownerId') !== ctx.state.user.id) {
        ctx.response.status = 403;
        ctx.response.body = {status: 'failed', err: "It's not your playlist"};
    }

    const videos = await ctx.state.youtubeAPI.getPlaylistItems(playlist.get('youtubeId'));
    const videoIds = videos.items.map((item) => {
        return item.contentDetails.videoId;
    });

    const json = JSON.stringify(videoIds);

    await playlist.update({status: "for sale", videos: json});

    await Sale.upsert({playlistId: id});

    ctx.response.body = {status: 'success', message: "The playlist is in the store now"};
});

router.get('/playlist/buy/:id', async function (ctx) {
    const playlistId = parseInt(ctx.params.id);
    let infoPlaylist = await Playlist.findById(playlistId);
    const plainPlaylist = infoPlaylist.get({plain: true});

    //add record in orders table
    let playlist = {
        userId: ctx.state.user.id,
        playlistId: plainPlaylist.id
    };

    await models.Order.upsert(playlist);

  //create Playlist in youtube
  const newYoutubePlaylist = await ctx.state.youtubeAPI.createPlaylist(plainPlaylist.title, plainPlaylist.description);

    //add videos to youtube playlist
    const playlistVideoIds = JSON.parse(plainPlaylist.videos);

    for (let i = 0; i < playlistVideoIds.length; i++) {
        await ctx.state.youtubeAPI.addVideoToPlaylist(newYoutubePlaylist.id, playlistVideoIds[i]);
    }

  //create playlist in DB
  await Playlist.create({
    youtubeId: newYoutubePlaylist.id,
    title: plainPlaylist.title,
    description: plainPlaylist.description,
    ownerId: ctx.state.user.id,
    status: 'purchased',
    originalId: plainPlaylist.id
  });

    ctx.response.body = {status: 'success', message: "Successfully bought playlist"};

});

router.use(async function (ctx, next) {
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.redirect('/')
    }
});

module.exports = router;
