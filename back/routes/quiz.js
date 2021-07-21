var express = require("express");
var router = express.Router();

const db = require("../components/db");
const model = require("../models/quiz");
const quiz_answer_model = require("../models/quiz_answer")

router.post("/", async function (req, res, next) {
  const body = req.body; 
  const cards = body.cards_id
  try {
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

router.patch("/", async function (req, res, next) {
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

router.get("/:quizId", async function (req, res, next) {

  const quiz_id = req.params.quizId;

  try{
    console.log("quiz_id : ", quiz_id); // quiz_id :  0
    const result = await product_model.getList(quiz_id);
    console.log("quiz get result : " , result);
    for (let i = 0; i < result.length; i++) { // quiz_id 에 대한 값 
      const quizTotalResult = await quiz_answer_model.getQuizTotal({id: result[i].id}); 
      result[i].cnt_t = quizTotalResult;
      const quizAnswerResult = await quiz_answer_model.getQuizAnswer({id: result[i].id}); 
      result[i].cnt_a = quizAnswerResult;
    }
    console.log("result : " , result);
  }catch(e){
    console.log("err : ", err);
    next(err);
  }
});

module.exports = router;
