// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all jokes
  app.get("/api/jokeList", function(req, res) {
    db.JokeList.findAll({})
    .then(function(dbJokeList) {
      res.json(dbJokeList);
    });
  });

  // POST route for saving a new joke
  app.post("/api/jokeList", function(req, res) {
    db.JokeList.create({
      text: req.body.complete
    }).then(function(dbJokeList) {
      res.json(dbJokeList);
    });
  });

  // DELETE route for deleting jokes.
  app.delete("/api/jokeList/:id", function(req, res) {
    db.JokeList.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbJokeList) {
      res.json(dbJokeList);
    });
  });

  // PUT route for updating jokes. 
  app.put("/api/jokeList", function(req, res) {
    db.JokeList.update({
      name: req.body.text,
      text: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbJokeList) {
      res.json(dbJokeList);
    });
  });
};
