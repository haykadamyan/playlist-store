const Sequelize = require('sequelize');
const database = require('../../config/config').database;

const sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    dialect: database.dialect
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
