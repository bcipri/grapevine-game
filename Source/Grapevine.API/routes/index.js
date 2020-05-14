var router = require('express').Router();

router.use('/games', require('./games'));
router.use('/whisper', require('./whisper'));

module.exports = router;