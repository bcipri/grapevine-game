const router = require("express").Router();
const messageMisinterpreter = require("../services/messageMisinterpreter");

router.post("/", async function (req, res) {
  try {
    let msg = await messageMisinterpreter.misinterpretMessage(req.body.message);
    res.json(msg);
  } catch (err) {
      res.status(500).send(err);
  }
});

module.exports = router;
