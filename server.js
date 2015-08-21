var mongoose = require('mongoose');
require('./models/Posts');
mongoose.connect('mongodb://localhost/events');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var Post = mongoose.model('Post');

var app = express();




// var express = require('express');
// var app     = express();
var router = express.Router();
// var routes = require('./routes');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

app.get('/posts', function(req, res, next) {
  // console.log('ugh');
  Post.find(function(err, posts){
    if (err) { return next(err); }

    res.json(posts);
  });
});

app.post('/posts', function(req, res, next) {
  var post = new Post(req.body);
  console.log(req.body);

  post.save(function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

module.exports = router;




app.listen(8080);
console.log('Magic happens on 8080');