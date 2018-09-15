
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

//MODEL
module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieId: {type: String, required: true},
  rating: Number
});

//module.exports = Review;
