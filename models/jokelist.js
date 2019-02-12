module.exports = function(sequelize, DataTypes) {
    var JokeList = sequelize.define("JokeList", {
        name: DataTypes.STRING,
        joke: DataTypes.STRING
    });
    return JokeList;
  };
  