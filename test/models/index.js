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
database.user = require('./user')(sequelize, Sequelize);
database.profile = require('./profile')(sequelize, Sequelize);
database.company = require('./company')(sequelize, Sequelize);
database.document = require('./document')(sequelize, Sequelize);

// associations
database.user.hasOne(database.profile);
database.user.belongsTo(database.company);
database.user.hasMany(database.document);

database.user.hasOne(database.user, { as: 'boss' });

module.exports = database;
