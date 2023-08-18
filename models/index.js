const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('getstake', 'ketantb', 'ketantb', {
    // host: 'localhost',
    logging: false,
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./users')(sequelize, DataTypes)
db.propeerty = require('./property')(sequelize, DataTypes)

module.exports = db;