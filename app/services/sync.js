const config = require('../../config/config');
const YoutubeAPI = require('./youtube');
const models = require('./models.js');

const Playlist = models.Playlist;

exports.playlists = async function (user) {
  "use strict";
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, user.accessToken, user.refreshToken);
  const youtubePlaylists = await youtubeAPI.getPlaylists();

  for (let i = 0; i < youtubePlaylists.items.length; i++) {

    let item = youtubePlaylists.items[i];

    const playlistInDB = await Playlist.findOne({where: {youtubeId: item.id}});

    if (playlistInDB && playlistInDB.get('status') === 'for sale') {
      const videos = await youtubeAPI.getPlaylistItems(item.id);
      const videoIds = videos.items.map((item) => {
        return item.contentDetails.videoId;
      });

      var json = JSON.stringify(videoIds);
    }

    let playlist = {
      youtubeId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      ownerId: user.id,
      videos: json || null,
      thumbnailUrl: item.snippet.thumbnails.high.url
    };
    await Playlist.upsert(playlist);
  }
  return youtubePlaylists;
};
