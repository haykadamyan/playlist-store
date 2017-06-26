const config  = require('../../config/config');
const googleApis = require('googleapis');
const promise = require('bluebird');

let YoutubeAPI = function YoutubeAPI(clientID, secret, redirect, accessToken, refreshToken) {
    this.OAuth2Client = new google.auth.OAuth2(
        clientID,
        secret,
        redirect
    );

    this.OAuth2Client.setAccessType('offline');

    this.OAuth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    });


    this.youtube = google.youtube({
        version: 'v3',
        auth: this.OAuth2Client
    });

};


YoutubeAPI.prototype.getPlaylists() = function() {
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
            console.log(data);
            console.log(response);

        }
    )
};

module.exports = YoutubeAPI;
