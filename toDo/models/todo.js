module.exports = function(sequelize, DataTypes) {
  var JokeList = sequelize.define("JokeList", {
    Joke: DataTypes.STRING,
    name: DataTypes.STRING
  });
  return JokeList;
};
