const router = require("express").Router();
const axios = require("axios");
const whisperServie = require("../services/whisperService");

router.post("/", async (req, res) => {
  try {
    const whisper = req.body;
    await whisperServie.logGame(whisper);

    if (whisperServie.isSenderTheLast(whisper.sentFromId,whisper.whisperRecipients)){
      res.status(200).send();  
      return;
    }

    const newWhisper = await whisperServie.getNewWhisper(whisper);
    const nextRecipientUrl = whisperServie.getNextRecipientUrl(
      whisper.nextWhisperRecipientId,
      whisper.whisperRecipients
    );

    console.log(`Forwarding to ${nextRecipientUrl}`);
    console.log(newWhisper);

    await axios.post(nextRecipientUrl, newWhisper);
   
    res.status(200).send();

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
