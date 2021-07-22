var express = require("express");
var router = express.Router();

const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const util = require("../components/util");

router.post("/upload", async function (req, res, next) {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      const file = files.file;
      if (file) {
        const currentTime = util.getCurrentTime().replace(" ", "");
        const dir = `public/card_img/${currentTime}`;
        !fs.existsSync(dir) && fs.mkdirSync(dir);
        const newPath = path.join(__dirname, "..", `${dir}/${file.name}`);
        fs.renameSync(file.path, newPath); //경로를 바꿔줍니다.
        res.json({result: `card_img/${currentTime}/${file.name}`});
      } else {
        res.json({ result: `no image file` });
      }
    });
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

module.exports = router;
