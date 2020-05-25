var router = require("express").Router();
var gameService = require("../services/gameService");

router.get("/", async function (req, res) {
  var games = await gameService.getAllGames();
  res.send(games);
});

module.exports = router;
