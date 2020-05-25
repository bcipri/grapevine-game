var router = require('express').Router();

router.use('/game', require('./gameRoute'));
router.use('/games', require('./gamesRouter'));
router.use('/whisper', require('./whisperRoute'));

module.exports = router;