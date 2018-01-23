module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define("Rating", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false,
      validate: {
        isDecimal: true
        // len: [1, 3]
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Rating.associate = function(models) {
    // We're saying that a Rating should belong to an User
    // A Rating can't be created without an User due to the foreign key constraint
    Rating.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Rating;
};
