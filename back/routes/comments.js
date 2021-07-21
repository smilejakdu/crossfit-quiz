var express = require("express");
var router = express.Router();

const db = require("../components/db");
const model = require("../models/comments");

router.post("/", async function (req, res, next) {
  const body = req.body; 
  console.log("body : ", body);
  try {
    const connection = await db.beginTransaction();
    const result = await model.insert(connection, body);
    await db.commit(connection);
		res.status(201).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.patch("/", async function (req, res, next) {
  try {
    const json = req.body; 
    const connection = await db.beginTransaction();
    const result = await model.update(connection, json);
    console.log("result 26 : ", result);
    await db.commit(connection);
		res.status(200).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  const json = req.body;
  try {
    const connection = await db.beginTransaction();
    const result = await model.delete(connection, {
      comment_idx: json.comment_idx,
    });
    await db.commit(connection);
    res.json({ result });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/:quizId", async function (req, res, next) {
	// {
	// 	quiz_id : 1,
	// 	google_id:1234123,
	// 	content : "content_test"
	// }
	const quiz_id = req.params.quizId;
	console.log("quiz_id : " , quiz_id);
  const result = await model.getList(quiz_id);
  res.status(200).json({ result });
});

module.exports = router;
