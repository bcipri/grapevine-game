const router = require("express").Router();
const axios = require("axios");

router.post("/", function (req, res) {
  var nextWhisperRecipientId = req.body.nextWhisperRecipientId;
  var nextWhisperRecipient = req.body.whisperRecipients.filter(
    (rec) => rec.id == nextWhisperRecipientId)[0];

  axios
    .post(nextWhisperRecipient.url, {
      
    })
    .then(function (response) {
      res.status(200).send("OK");
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send();
    });
});

module.exports = router;
