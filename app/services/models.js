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
    type: Sequelize.STRING,
    unique:true
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
  youtubeId :{
    type:Sequelize.STRING,
    unique:true
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  ownerId : {
    type: Sequelize.INTEGER,
    unique: 'purchase'
  },
  status: {
    type:Sequelize.STRING,
    defaultValue: 'youtube'
  },
  deleted: {
    type:Sequelize.BOOLEAN,
    defaultValue:false
  },
  videos: Sequelize.TEXT,
  originalId:{
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
  playlistId: {type: Sequelize.STRING, unique: 'order'}
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

// User.sync({force:true});
// Playlist.sync({force:true});
// Order.sync({force:true});
// Sale.sync({force:true});

User.sync();
Playlist.sync();
Order.sync();
Sale.sync();

module.exports = {User, Playlist, Order, Sale};
