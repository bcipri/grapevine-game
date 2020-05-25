var AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-2",
});

const putGame = (game) => {
  put("Games", game);
};

const getGame = async (gameId) => {
  try {
    var params = {
      TableName: "Games",
      Key: {
        gameId: gameId,
      },
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    var res = await docClient.get(params).promise();

    return res.Item;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const put = (tableName, item) => {
  var params = {
    TableName: tableName,
    Item: item,
  };

  var docClient = new AWS.DynamoDB.DocumentClient();
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
