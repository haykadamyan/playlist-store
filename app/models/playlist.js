const models = require('../services/models.js');
const config = require('../../config/config');
const YoutubeAPI = require('../services/youtube');

const Playlist = models.Playlist;

module.exports = async function(user){
  "use strict";
  const youtubeAPI = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, user.accessToken, user.refreshToken);
  const allPlaylists = await youtubeAPI.getPlaylists();
  console.log(allPlaylists);
  const savedPlaylists = await Playlist.findAll(
    {
      where:{
        ownerId: user.id
      }
    });

};
