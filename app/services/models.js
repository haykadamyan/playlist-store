const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('users', {
  displayName: {
    type: Sequelize.STRING
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
    type: Sequelize.STRING,
    unique: true
  },
  ILPUsername: {
    type: Sequelize.STRING,
    unique: true
  },
  ILPPassword: {
    type: Sequelize.STRING
  }
});

const Playlist = sequelize.define('playlists', {
  youtubeId: {
    type: Sequelize.STRING,
    unique: true
  },
  thumbnailUrl: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  ownerId: {
    type: Sequelize.INTEGER,
    unique: 'purchase'
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'youtube'
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  videos: Sequelize.TEXT,
  originalId: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    unique: 'purchase'
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0.99
  }
});

const Order = sequelize.define('orders', {
  userId: {type: Sequelize.INTEGER, unique: 'order'},
  playlistId: {type: Sequelize.INTEGER, unique: 'order'}
});

const Sale = sequelize.define('sales', {
  playlistId: {
    type: Sequelize.INTEGER
  }
  },
  {
    indexes: [{
      unique: true,
      fields: ['playlistId']
    }]
});

User.hasMany(Playlist, {foreignKey: "userId"});
User.hasMany(Order, {foreignKey: "userId"});

Playlist.belongsTo(User, {foreignKey: "userId"});
Playlist.hasMany(Order, {foreignKey: "playlistId"});

Order.belongsTo(Playlist, {foreignKey: "playlistId"});
Order.belongsTo(User, {foreignKey: "userId"});

// sequelize.sync();
sequelize.sync({force: true});

module.exports = {User, Playlist, Order, Sale};
