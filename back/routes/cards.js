var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/cards');

router.post('/',async function (req, res, next) {
    const body = req.body;
    console.log("bodty : " , body);
    console.log("google_id : ", body.google_id);
    console.log("google_id : ", typeof body.google_id);
    try {
       const connection = await db.beginTransaction(); 
       const result = await model.insert(connection, body);
       const card_id = result.insertId;

       await db.commit(connection);
       res.status(201).json({ card_id : card_id });
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})


router.patch("/", async function (req, res, next) {
  try {
    const body = req.body; 
    console.log("body : " , body);
    const connection = await db.beginTransaction();
    const result = await model.update(connection, body);
    const card_id = result.insertId;

    await db.commit(connection);
    res.status(200).json({ card_id: card_id });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});


router.delete('/:cardId', async function (req, res, next) {
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(connection, {id:card_idx})
        const card_id = result.insertId;

        await db.commit(connection)
        res.status(200).json({ card_id: card_id }).send("delete success")
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})

// router.get('/',async function (req, res, next) {
//     try {
//         const offset = req.query.offset
//         const limit = req.query.limit;
//         // return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
//         console.log("offset : " , offset);
//         console.log("limit : ", limit);
//         const result = await model.getList({offset : offset, limit : limit});
//         console.log("result : " , result);
//         res.status(200).json({ result });
//     } catch(err){
//         console.log('err : ',err)
//         next(err)
//     }
// })


module.exports = router;