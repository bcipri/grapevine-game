const router = require("express").Router();
const axios = require("axios");
const whisperServie = require("../services/whisperService");

router.post("/", async (req, res) => {
  var whisper = req.body;

  await whisperServie.logGame(whisper);

  var newWhisper = whisperServie.getNewWhisper(whisper);
  var nextRecipientUrl = whisperServie.getNextRecipientUrl(
    whisper.nextWhisperRecipientId,
    whisper.whisperRecipients
  );

  axios
    .post(nextRecipientUrl, newWhisper)
    .then(function (response) {
      res.status(200).send("OK");
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send();
    });
});

module.exports = router;
