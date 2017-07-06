const google = require('googleapis');
const promise = require('bluebird');
var playlistId, channelId;
let YoutubeAPI = function YoutubeAPI(clientID, secret, redirect, accessToken, refreshToken) {
  this.OAuth2Client = new google.auth.OAuth2(
    clientID,
    secret,
    redirect
  );

  this.OAuth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  });


  this.youtube = google.youtube({
    version: 'v3',
    auth: this.OAuth2Client
  });

};


YoutubeAPI.prototype.getPlaylists = function () {
  "use strict";

  return new Promise((resolve, reject) => {
    this.youtube.playlists.list(
      {
        part: 'id, snippet',
        mine: true,
        maxResults: 50
      },
      function (err, data, response) {
        if (err) {
          console.log("error: " + err);
        }
        if (err) {
          console.log("error: " + err);
          return reject(err);
        }
        return resolve(data);
      }
    );
  });

};

YoutubeAPI.prototype.getPlaylistItems = function (id) {
  "use strict";
  return new Promise((resolve, reject) => {
    this.youtube.playlistItems.list({
        part: "snippet, contentDetails",
        playlistId: id,
        maxResults: 50
      },
      function (err, data, response) {
        if (err) {
          console.log("error: " + err);
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
};


YoutubeAPI.prototype.createPlaylist = function (title, description) {
  "use strict";
  return new Promise((resolve, reject) => {
    this.youtube.playlists.insert({
        part: "snippet",
        resource: {
          snippet: {
            title: title,
            description: description
          }
        }
      },
      function (err, data, response) {
        if (err) {
          console.log("error: " + err);
          return reject(err);
        }
        console.log(data);
        return resolve(data);
      });
  });
};


YoutubeAPI.prototype.addVideoToPlaylist = function (playlistId, videoId) {
  "use strict";
  return new Promise((resolve, reject) => {
    this.youtube.playlistItems.insert({
      part: 'snippet',
      resource: {
        snippet: {
          playlistId: playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId: videoId
          }
        }
      }
    }, function (err, data, response) {
      if (err) {
        console.log("error: " + err);
        return reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
};


module.exports = YoutubeAPI;
