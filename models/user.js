var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });
  
  User.beforeCreate(function(model, options){
    return new Promise (function(resolve, reject){
        bcrypt.hash(model.password, null, null, function(err, hash) {
            if(err) return reject(err);
            model.password = hash;
            return resolve(model, options);
        });
    });
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
