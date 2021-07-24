var express = require('express');
var router = express.Router();
const db = require('../components/db')
const model = require('../models/user');
const crypto = require('../components/crypto');
const jwt = require("jsonwebtoken");

router.post("", async function (req, res, next) {
  const body = req.body; 
  try {
    const connection = await db.beginTransaction();
    const usersResult = await model.getList({ id: body.id });

    if (usersResult.length > 0) {
      res.status(200).json({ usersResult }).send("login");   
    }else{
      const result = await model.insert(connection, body);
      await db.commit(connection);
      res.status(201).json({ result }).send("signup");   
    }
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/:userId", async function (req, res, next) {

  try {
    const user_idx = req.params.userId;
    const result = await model.getList({ id: user_idx });
    res.status(200).json({ result });   
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});


module.exports = router;

