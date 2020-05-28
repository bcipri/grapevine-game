const router = require("express").Router();

router.use("/game", require("./gameRoute"));
router.use("/games", require("./gamesRouter"));
router.use("/whisper", require("./whisperRoute"));
router.use("/message", require("./messageRoute"));

module.exports = router;
