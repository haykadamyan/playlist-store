const config  = require('../../config/config');
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

    this.youtube.playlists.list(
        {
            part: 'id, snippet',
            mine: true,
        },
        function (err, data, response){
            if (err) {
                console.log("error: " + err);
            }
            console.log(data.items[0]);
        }
    )
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

        }
        else
        {
            console.log('Could not create playlist');
        }
    });
}; 
module.exports = YoutubeAPI;
