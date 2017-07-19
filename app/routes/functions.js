'use strict';

exports.main = async function (ctx) {
  conole.log('armen');
  if (!ctx.isAuthenticated()) {
    await ctx.render('login');
    return false;
  }
  await Sync.playlists(ctx.state.user);

  const playlists = await Playlist.findAll({where: {ownerId: ctx.state.user.id}});
  const storePlaylists = await Playlist.findAll({where: {status: "for sale", ownerId: {$not: ctx.state.user.id}}});
  const purchasedPlaylists = await Playlist.findAll({where: {status: 'purchased', ownerId: ctx.state.user.id}});
  const ordersPlaylists = await Order.findAll();
  let orderPlaylistsNames = [];
  let trues = 0;
  for (let a = 0; a < storePlaylists.length; a++) {
    for (let b = 0; b < purchasedPlaylists.length; b++) {
      if (purchasedPlaylists[b].dataValues.originalId === storePlaylists[a].dataValues.id) {
        trues++;
      }
    }
    if (trues === 1) {
      storePlaylists.splice(a, 1);
    }
    trues = 0;
  }
  for (let a = 0; a < ordersPlaylists.length; a++) {
    const orderPlaylist = await Playlist.findAll({
      where: {
        id: ordersPlaylists[a].playlistId,
        ownerId: ctx.state.user.id
      }
    });
    orderPlaylistsNames.push(orderPlaylist);
  }

  const mySales = await Playlist.findAll({where: {ownerId: ctx.state.user.id, status: 'for sale'}});
  await ctx.render('main', {
    title: "Playlist Store",
    playlists: playlists,
    storePlaylists: storePlaylists,
    orders: orderPlaylistsNames,
    sales: mySales
  });
};

exports.userInfo = async function (ctx) {
  await ctx.render('userInfo', {user: ctx.state.user});
};

exports.ILPAuthenticate = async function (ctx) {
  let data = ctx.query;

  const user = await User.findById(ctx.state.user.id);

  await user.update({ILPUsername: data.username, ILPPassword: data.password});

  ctx.response.body = {status: 'success', message: "ILP address updated"};
};

exports.showPlaylist = async function (ctx) {
  const id = parseInt(ctx.params.id);
  const playlist = await Playlist.findById(id);
  const plainPlaylist = playlist.get({plain: true});
  const videosData = await ctx.state.youtubeAPI.getPlaylistItems(playlist.youtubeId);

  const videos = videosData.items.map((item) => {
    return item.snippet.title;
  });

  await ctx.render('playlist', {title: 'One playlist', playlist: plainPlaylist, videos: videos});
};

exports.buyPlaylist = async function (ctx) {
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  //
  // console.log(' ______');
  // console.log('/      \\');
  // console.log('|  $$$$$$\\  ______   ______ ____    ______   _______          ______    ______   ______ ____    ______   _______');
  // console.log('| $$__| $$ /      \\ |      \\    \\  /      \\ |       \\        |      \\  /      \\ |      \\    \\  /      \\ |       \\');
  // console.log('| $$    $$|  $$$$$$\\| $$$$$$\\$$$$\\|  $$$$$$\\| $$$$$$$\\        \\$$$$$$\\|  $$$$$$\\| $$$$$$\\$$$$\\|  $$$$$$\\| $$$$$$$\\');
  // console.log('| $$$$$$$$| $$   \\$$| $$ | $$ | $$| $$    $$| $$  | $$       /      $$| $$   \\$$| $$ | $$ | $$| $$    $$| $$  | $$');
  // console.log('| $$  | $$| $$      | $$ | $$ | $$| $$$$$$$$| $$  | $$      |  $$$$$$$| $$      | $$ | $$ | $$| $$$$$$$$| $$  | $$');
  // console.log('| $$  | $$| $$      | $$ | $$ | $$ \\$$     \\| $$  | $$       \\$$    $$| $$      | $$ | $$ | $$ \\$$     \\| $$  | $$');
  // console.log('| $$   \\$$ \\$$       \\$$  \\$$  \\$$  \\$$$$$$$ \\$$   \\$$        \\$$$$$$$ \\$$       \\$$  \\$$  \\$$  \\$$$$$$$ \\$$   \\$$');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
  // console.log('------------------------------------------------------------------------------------------------------------------------------------------------');


  const playlistId = parseInt(ctx.params.id);
  let infoPlaylist = await Playlist.findById(playlistId);
  const plainPlaylist = infoPlaylist.get({plain: true});

  const user = await User.findById(plainPlaylist.ownerId);

  await pay(
    ctx.state.user.ILPUsername,
    ctx.state.user.ILPPassword,
    user.get('ILPUsername'),
    plainPlaylist.price,
    'Payment for youtube playlist: ' + infoPlaylist.get('title')
  );

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
  console.log('purchased');
  ctx.response.body = {status: 'success', message: "Successfully bought playlist"};
};

exports.sellPlaylist = async function (ctx) {
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
};

exports.dontSell = async function (ctx) {
  let data = ctx.query;
  const playlist = await Playlist.findOne({where: {ownerId: ctx.state.user.id, id: data.playlistId}});

  await playlist.update({status: 'youtube'});

  ctx.response.body = {status: 'success', message: "status changed"};
};