var express = require("express");
var router = express.Router();
const Post = require("../database/model/Post");
const Reply = require("../database/model/Reply");

/* GET post page. */
router.get("/", function (req, res, next) {
  Post.findAll({
    include: [
      {
        model: Reply,
        as: "Replies",
        attributes: ["id", "postId", "name", "detail", "likes"],
      },
    ],
    order: [["id", "DESC"]],
  }).then((posts) => {
    const postsData = posts.map((post) => {
      const { id, name, detail, likes, Replies } = post;
      return { id, name, detail, likes, Replies };
    });
    res.status(201).send(postsData);
  });
});

/* POST post page. */
router.post("/", function (req, res, next) {
  const { name, detail } = req.body;
  if (!name || !detail) {
    res.status(400).send("Invalid request");
    return;
  }
  Post.create({
    name,
    detail,
  })
    .then((post) => {
      const { id, name, detail, likes } = post;
      res.status(201).send({ id, name, detail, likes });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// update post likes by id
router.put("/like", function (req, res, next) {
  const { id, liked } = req.body;
  if (!id) {
    res.status(400).send("Invalid request");
    return;
  }
  Post.findByPk(id)
    .then((post) => {
      if (!post) {
        res.status(404).send("Post not found");
        return;
      }
      liked ? post.increment("likes") : post.decrement("likes");
      const { id } = post;
      res.status(200).send({ id });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
