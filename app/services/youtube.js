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


YoutubeAPI.prototype.getPlaylists = function() {
    "use strict";

    return new Promise((resolve, reject)=>{
      this.youtube.playlists.list(
        {
          part: 'id, snippet',
          mine: true,
          maxResults: 50
        },
        function (err, data, response){
<<<<<<< HEAD
            if (err) {
                console.log("error: " + err);
            }
            console.log(data.items[0]);
=======
          if (err) {
            console.log("error: " + err);
            return reject(err);
          }
          return resolve(data);
>>>>>>> 1be39b0e76f71fea91f47e4ba0ccfb7a17c51e4d
        }
      );
    });

};

YoutubeAPI.prototype.getPlaylistItems = function(id){
    "use strict";
  return new Promise((resolve, reject)=>{
    this.youtube.playlistItems.list({
        part:"snippet, contentDetails",
        playlistId:id,
        
    },
    function (err, data, response){
      if (err) {
        console.log("error: " + err);
        return reject(err);
      }
      return resolve(data);
    }
    );
  });
};
YoutubeAPI.prototype.createPlaylist = function(titlePl){
    this.request = this.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
          snippet: {
            title: titlePl,
            description: 'A private playlist created with the YouTube API'
          },
          status: {
            privacyStatus: 'private'
          }
        }
    });
    this.request.execute(function(response) {
        this.result = response.result;
        if (result) {
          playlistId = result.id;
          console.log(playlistId);
          console.log(result.snippet.title);
          console.log(result.snippet.description);

<<<<<<< HEAD
        }
        else
        {
            console.log('Could not create playlist');
        }
    });
}; 
=======

YoutubeAPI.prototype.createPlaylist = function(title){
    "use strict";
    return new Promise((resolve, reject)=>{
        this.youtube.playlists.insert({
          part: "snippet",
          resource:{
              snippet:{
                  title:title
              }
          }
        },
        function(err, data, response){
          if (err) {
            console.log("error: " + err);
            return reject(err);
          }
          console.log(data);
          return resolve(data);
        });
    });
};



YoutubeAPI.prototype.addVideoToPlaylist = function(playlistId, videoId){
    "use strict";
    return new Promise((resolve, reject)=>{
        this.youtube.playlistItems.insert({
          part:'snippet',
          resource : {
              snippet:{
                  playlistId:playlistId,
                  resourceId: {
                      kind:"youtube#video",
                      videoId: videoId
                  }
              }
          }
        }, function(err, data, response){
          if (err) {
            console.log("error: " + err);
            return reject(err);
          }
          console.log(data);
          return resolve(data);
        });
    });
};


>>>>>>> 1be39b0e76f71fea91f47e4ba0ccfb7a17c51e4d
module.exports = YoutubeAPI;
