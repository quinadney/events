var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  size: String,
  tags: [{type: String, default: null}],
  information: String
});

mongoose.model('Post', PostSchema);