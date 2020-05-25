const messageMisinterpreter = require("./messageMisinterpreter");
const whisperGameLogger = require("./whisperGameLogger");

const getNewWhisper = (whisper) => {
  let newWhisper = { ...whisper };

  newWhisper.sentFromId++;
  newWhisper.nextWhisperRecipientId++;

  if (isNextRecipientTheLast(whisper)) {
    newWhisper.nextWhisperRecipientId = 0;
  }

  newWhisper.message = messageMisinterpreter.misinterpretMessage(
    whisper.message
  );

  return newWhisper;
};

const getNextRecipientUrl = (nextRecipientId, recipients) => {
  return recipients.filter((rec) => rec.id == nextRecipientId)[0].url;
};

const logGame = async (whisper) => {
  if (whisper.sentFromId == -1) {
    whisperGameLogger.logFirstWhisperOfGame(whisper);
  }

  if (isSenderTheLast(whisper.sentFromId, whisper.whisperRecipients)) {
    await whisperGameLogger.logLastWhisperOfGame(whisper);
  }
};

const isSenderTheLast = (sentFromId, whisperRecipients) => {
  return sentFromId == Math.max(...whisperRecipients.map((w) => w.id));
};

const isNextRecipientTheLast = (whisper) => {
  return (
    whisper.nextWhisperRecipientId ==
    Math.max(...whisper.whisperRecipients.map((w) => w.id))
  );
};

exports.getNewWhisper = getNewWhisper;
exports.getNextRecipientUrl = getNextRecipientUrl;
exports.logGame = logGame;
