const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mathdesign", "username", "password", {
  dialect: "sqlite",
  host: "./database/mathdesign.sqlite",
});

module.exports = sequelize;
