const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // will be null by default,
    // total number of plans in lifetime of account
    plans: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    // number of plans made in upcoming week
    upcoming_plans: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://i.imgur.com/0I3sDie.png'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 30]
      },
      defaultValue: ""
    }
  });

  User.associate = function (models) {
    User.hasMany(models.UserDialogue, {
      onDelete: "cascade"
    });
    User.hasMany(models.Event, {
      foreignKey: {
        allowNull: false
      }
    });
    User.belongsToMany(models.User, { as: 'Associate', through: 'UserAssociate' });
  };

  // utilize bcrypt to encrypt password
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  })

  return User;
};