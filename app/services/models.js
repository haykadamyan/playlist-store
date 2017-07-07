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
  }
});

const Playlist = sequelize.define('playlists', {
  youtubeId :{
    type:Sequelize.STRING,
    unique:true
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  ownerId : Sequelize.INTEGER,
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
    defaultValue: null
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

User.sync();
Playlist.sync();
Order.sync();
Sale.sync();


module.exports = {User, Playlist, Order, Sale};

