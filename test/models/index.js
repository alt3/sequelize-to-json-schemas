/**
 * Helper used to connect all models to a database object so everything is accessible
 * via a single object. Does not require an active database connection.
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
});

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

// models
database.user = require('./user.js')(sequelize, Sequelize);
database.profile = require('./profile.js')(sequelize, Sequelize);

// associations
database.user.hasOne(database.profile);
database.profile.belongsTo(database.user);

module.exports = database;
