const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

class Reply extends Model {}

Reply.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Reply",
  }
);

module.exports = Reply;
