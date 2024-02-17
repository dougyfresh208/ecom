require('dotenv').config();
const Sequelize = require('sequelize');

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// For Sequelize CLI
if (process.env.SEQUELIZE_CLI) {
  module.exports = config;
} else {
  module.exports = sequelize;
}
