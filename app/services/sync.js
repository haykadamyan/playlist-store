const config = require('../../config/config');
const YoutubeAPI = require('./youtube');
const models = require('./models.js');

const Playlist = models.Playlist;

exports.playlists = async function(user){
  "use strict";
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, user.accessToken, user.refreshToken);
  const youtubePlaylists = await youtubeAPI.getPlaylists();

  //console.log(youtubePlaylists);
  for(let i=0;i<youtubePlaylists.items.length;i++){

    let item = youtubePlaylists.items[i];

    console.log(item);
    let playlist = {
      youtubeId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      ownerId: user.id,
      videos: 'Armen'
    };
    await Playlist.upsert(playlist);
  }


  return youtubePlaylists;
};
