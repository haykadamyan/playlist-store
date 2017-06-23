'use strict';

const config = {
    port: 3000,
    koaSecret: 'Some very strong key goes here, yo!',
    google: {
        clientID: '994707594746-124d3k6o679gs7m4iielmg86levi35sk.apps.googleusercontent.com',
        clientSecret: 'MsZuGa41_OVOcU6GCHNAkL85',
        callbackURL: 'http://playlist.am:3000/auth/youtube/callback',
        accessType: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube'],
        approvalPrompt: 'force'
    }
};

module.exports = config;
