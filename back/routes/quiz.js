var express = require("express");
var router = express.Router();

const db = require("../components/db");
const model = require("../models/quiz");

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const cards = body.cards_id;
		const connection = await db.beginTransaction();

    if (cards && cards.length > 0) {
      for (let i = 0; i < cards.length; i++) {
        body.cards_id = cards[i]
        await model.insert(connection, body);
      }
    }        

		await db.commit(connection);
		res.status(201).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.put("/", async function (req, res, next) {
  try {
    const body = req.body;
    const cards = body.cards_id;
    const connection = await db.beginTransaction();

    if (cards && cards.length > 0) {
      for (let i = 0; i < cards.length; i++) {
        body.cards_id = cards[i];
        await model.update(connection, body);
      }
    }

    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.delete("/:quizId", async function (req, res, next) {
	const quiz_id = req.params.quizId;
  try {
    const connection = await db.beginTransaction();
    const result = await model.delete(connection, { quiz_id: quiz_id });
    await db.commit(connection);
		res.status(200).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/", async function (req, res, next) {
 
});

module.exports = router;
