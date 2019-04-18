
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

let posts = [];

const homeStartingContent = "Welcome to the home page of my blog. Click compose to start adding to the blog.";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('home', {homeContent: homeStartingContent, postContent: posts});
});

app.get('/about', (req, res) => {
  res.render('about', {aboutStartContent: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render('contact', {contactStartContent: contactContent});
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:title', (req, res) => {
  const title = _.lowerCase(req.params.title);

  posts.forEach(post => {
    var postTitle = _.lowerCase(post.title);

    if (postTitle === title) {
      res.render('post', {title: post.title, body: post.content, link: 'post/' + posts.title});
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
