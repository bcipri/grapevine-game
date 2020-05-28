var router = require("express").Router();
var gameService = require("../services/gameService");

router.get("/", async function (req, res) {
  try {
    var games = await gameService.getAllGames();
    res.send(games);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
