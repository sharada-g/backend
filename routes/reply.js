var express = require("express");
var router = express.Router();
const Reply = require("../database/model/Reply");

/* POST reply page. */
router.post("/", function (req, res, next) {
  const { name, detail, postId } = req.body;
  if (!name || !detail || !postId) {
    res.status(400).send("Invalid request");
    return;
  }
  Reply.create({
    postId,
    name,
    detail,
  })
    .then((post) => {
      const { id, postId, name, detail, likes } = post;
      res.status(201).send({ id, postId, name, detail, likes });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
