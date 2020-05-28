const router = require("express").Router();
const gameService = require("../services/gameService");

router.get("/:id", async function (req, res) {
  try {
    let game = await gameService.getGame(req.params.id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).send("Game not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
