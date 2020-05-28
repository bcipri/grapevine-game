const db = require("../infrastructure/db");

logFirstWhisperOfGame = (whisper) => {
  var game = {
    gameId: whisper.gameId,
    gameStarted: new Date().toISOString(),
    startingMessage: whisper.message,
  };

  db.putGame(game);
};

logLastWhisperOfGame = async (whisper) => {
  var game = await db.getGame(whisper.gameId);

  var finishedGame = { ...game };
  finishedGame.endMessage = whisper.message;
  finishedGame.gameEnded = new Date().toISOString();

  db.putGame(finishedGame);
};

exports.logFirstWhisperOfGame = logFirstWhisperOfGame;
exports.logLastWhisperOfGame = logLastWhisperOfGame;
