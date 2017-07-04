const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('users', {
  displayName: {
   type:Sequelize.STRING
  },
  accessToken: {
    type: Sequelize.STRING
  },
  refreshToken: {
    type: Sequelize.STRING
  },
  idToken: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
});

const Playlist = sequelize.define('playlists', {
  youtubeId : Sequelize.INTEGER,
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  ownerId : Sequelize.INTEGER,
  status: Sequelize.TEXT,
  deleted: Sequelize.BOOLEAN,
  videos: Sequelize.TEXT,
  originalId: Sequelize.INTEGER
});

const Order = sequelize.define('orders', {
  userId:Sequelize.INTEGER,
  playlistId: Sequelize.INTEGER
});


User.sync();
Playlist.sync();
Order.sync();


module.exports = {User, Playlist, Order};

