
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

//MODEL
module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
