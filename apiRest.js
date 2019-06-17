const express = require('express')
var request = require('request');
const fs = require('fs');

var bodyParser = require('body-parser')
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var postsData = JSON.parse(fs.readFileSync('./data/posts.json'));

app.get("/posts", (req, res) => {
  res.send(Object.values(postsData.posts))
})

app.get("/post/:id", (req, res) => {
  post = postsData.posts[req.params.id]
  res.send(post)
})

app.get("/post/:id/comments", (req, res) => {
  comments = postsData.posts[req.params.id].comments
  res.send(Object.values(comments))
})

app.post("/post/:id/comment", (req, res) => {
  postsData.posts[req.params.id].comments.push(req.body)
  res.end();
})

app.post("/posts", (req, res) => {
  console.log(req.body)
  req.body.comments = []
  postsData.posts.push(req.body)
  res.end();
})

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
