const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('getstake', 'ketantb', 'ketantb', {
    // host: 'localhost',
    logging: false,
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./users')(sequelize, DataTypes)
db.propeerty = require('./property')(sequelize, DataTypes)

module.exports = db;