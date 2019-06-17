const express = require('express')
var request = require('request');

const app = express();
app.set('view engine', 'pug');
// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  request.get({ url: "http://localhost:7000/posts" }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        posts = JSON.parse(body)
        res.render('index', {
          title: 'The ultimate blog for Video Game Reviews',
          posts: posts
        });
    }
    else {
      console.log("An error has occured when getting the post list")
    }
  });
})

app.get("/post", (req, res) => {
  postId = req.query.id
  request.get({ url: `http://localhost:7000/post/${postId}` }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      post = JSON.parse(body)

      request.get({ url: `http://localhost:7000/post/${postId}/comments` }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            comments = JSON.parse(body)
            res.render('post', {
              title: 'The ultimate blog for Video Game Reviews',
              post: post,
              comments: comments
            });
        }
        else {
          console.log("An error has occured when getting the comments")
        }
      })
    }
    else {
      console.log("An error has occured when getting the post")
    }
  });
})

const server = app.listen(8000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
