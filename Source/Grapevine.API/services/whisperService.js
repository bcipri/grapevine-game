const messageMisinterpreter = require("./messageMisinterpreter");
const whisperGameLogger = require("./whisperGameLogger");

const getNewWhisper = async (whisper) => {
  let newWhisper = { ...whisper };

  newWhisper.sentFromId++;
  newWhisper.nextWhisperRecipientId++;

  if (isNextRecipientTheLast(whisper)) {
    newWhisper.nextWhisperRecipientId = 0;
  }

  newWhisper.message = await messageMisinterpreter.misinterpretMessage(
    whisper.message
  );

  return newWhisper;
};

const getNextRecipientUrl = (nextRecipientId, recipients) => {
  const nextRecipient = recipients.filter(
    (rec) => rec.id == nextRecipientId)[0];
  
  if (nextRecipient) {
    return nextRecipient.url;
  }
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
  if (sentFromId == -1) {
    return false;
  }

  return sentFromId == Math.max(...whisperRecipients.map((w) => w.id));
};

const isNextRecipientTheLast = (whisper) => {
  return (
    whisper.nextWhisperRecipientId ==
    Math.max(...whisper.whisperRecipients.map((w) => w.id))
  );
};

exports.getNewWhisper = getNewWhisper;
exports.isSenderTheLast = isSenderTheLast;
exports.getNextRecipientUrl = getNextRecipientUrl;
exports.logGame = logGame;
