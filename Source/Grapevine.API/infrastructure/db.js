const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-2",
});

const GAMES_TABLENAME = 'Games';

const putGame = (game) => {
  put(GAMES_TABLENAME, game);
};

const getGame = async (gameId) => {
  const params = {
    TableName: GAMES_TABLENAME,
    Key: {
      gameId: gameId,
    },
  };

  const docClient = new AWS.DynamoDB.DocumentClient();
  const res = await docClient.get(params).promise();

  return res.Item;
};

const getAllGames = async () => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const res = await docClient
    .scan({
      TableName: GAMES_TABLENAME,
    })
    .promise();

  return res.Items;
};

const put = (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item,
  };

  const docClient = new AWS.DynamoDB.DocumentClient();
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  });
};

exports.putGame = putGame;
exports.getGame = getGame;
exports.getAllGames = getAllGames;
