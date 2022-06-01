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

// update reply likes by id
router.put("/like", function (req, res, next) {
  const { id, liked } = req.body;
  if (!id) {
    res.status(400).send("Invalid request");
    return;
  }
  Reply.findByPk(id)
    .then((reply) => {
      if (!reply) {
        res.status(404).send("Reply not found");
        return;
      }
      liked ? reply.increment("likes") : reply.decrement("likes");
      const { id } = reply;
      res.status(200).send({ id });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
