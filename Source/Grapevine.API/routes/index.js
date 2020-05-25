var router = require('express').Router();

router.use('/games', require('./games'));
router.use('/whisper', require('./whisperRoute'));

module.exports = router;