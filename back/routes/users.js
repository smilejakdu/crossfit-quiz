var express = require('express');
var router = express.Router();
const db = require('../components/db')
const model = require('../models/user');
const crypto = require('../components/crypto');
const jwt = require("jsonwebtoken");

router.post("", async function (req, res, next) {
  const body = req.body; 
  console.log("body : ", body);
  // body :  { google_id: 125123, username: 'user_test1', image_url: 'img_url_test' }
  try {
    const connection = await db.beginTransaction();
  // user id duplicate check
    const usersResult = await model.getList({ google_id: body.google_id });
    if (usersResult.length > 0) {
      // 로그인
      console.log("usersResult : " , usersResult);
      res.status(200).json({ usersResult });   
    }else{
      // 회원가입 
      const result = await model.insert(connection, body);
      await db.commit(connection);
      res.status(200).json({ usersResult });   
    }
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/:userId", async function (req, res, next) {

  try {
    const user_idx = req.params.userId;
    console.log("user_idx : " , user_idx);
    const result = await model.getList({ id: user_idx });
    console.log("result123 : " , result);
    res.status(200).json({ result });   
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});


module.exports = router;

