const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const Reply = require("./Reply");

class Post extends Model {}

Post.init(
  {
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
    modelName: "Post",
  }
);

Post.hasMany(Reply, {
  foreignKey: "postId",
});
Reply.belongsTo(Post);

module.exports = Post;
