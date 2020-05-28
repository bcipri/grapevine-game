const router = require("express").Router();
const gameService = require("../services/gameService");

router.get("/", async function (req, res) {
  try {
    const games = await gameService.getAllGames();
    res.send(games);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
