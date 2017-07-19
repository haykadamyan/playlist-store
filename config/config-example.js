'use strict';

const config = {
    port: 3000,
    koaSecret: 'Some very strong key goes here, yo!',
    google: {
        clientID: 'Client id here',
        clientSecret: 'Client secret here',
        callbackURL: 'http://playlist.am:3000/auth/youtube/callback',
        accessType: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube'],
        approvalPrompt: 'force'
    },
    database: {
        name: 'DB name',
        username: 'username',
        password: 'password',
        host: 'host',
        dialect: 'dialect'
    },
    ILPAddress: 'ilp.tumo.org'
};

module.exports = config;
