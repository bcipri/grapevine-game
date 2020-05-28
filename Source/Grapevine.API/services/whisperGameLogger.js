const db = require("../infrastructure/db");

logFirstWhisperOfGame = (whisper) => {
  const game = {
    gameId: whisper.gameId,
    gameStarted: new Date().toISOString(),
    startingMessage: whisper.message,
  };

  db.putGame(game);
};

logLastWhisperOfGame = async (whisper) => {
  const game = await db.getGame(whisper.gameId);

  const finishedGame = { ...game };
  finishedGame.endMessage = whisper.message;
  finishedGame.gameEnded = new Date().toISOString();

  db.putGame(finishedGame);
};

exports.logFirstWhisperOfGame = logFirstWhisperOfGame;
exports.logLastWhisperOfGame = logLastWhisperOfGame;
