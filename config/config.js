'use strict';

const config = {
    port: 3000,
    koaSecret: 'Some very strong key goes here, yo!',
    google: {
        clientID: '994707594746-124d3k6o679gs7m4iielmg86levi35sk.apps.googleusercontent.com',
        clientSecret: 'PuBpMyMQb3MWFlrG1dkbESfv',
        callbackURL: 'http://playlist.am:3000/auth/youtube/callback',
        accessType: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube'],
        approvalPrompt: 'force'
    },
    database: {
        name: 'playlist-store',
        username: 'root',
        password: '',
        host: 'localhost',
        dialect: 'mysql'
    },
    ILPAddress: 'ilp.tumo.org'
};

module.exports = config;
