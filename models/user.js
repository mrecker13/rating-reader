module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });
  

  User.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Rating, {
      onDelete: "cascade"
    });
  };

  return User;
};
