const db = require('../infrastructure/db');

const getGame = async (id) => {
    let gameId = parseInt(id);
    return await db.getGame(gameId);
};

const getAllGames = async () => {
    return await db.getAllGames();
};

module.exports.getGame = getGame;
module.exports.getAllGames = getAllGames;
