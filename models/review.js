
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//MODEL
const ReviewSchema = new Schema({
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

module.exports = mongoose.model('Review', ReviewSchema);
