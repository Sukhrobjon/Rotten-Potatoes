
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');


module.exports = function (app) {

  // NEW
  app.get('/movies/:movieId/reviews/new', (req, res) => {
    res.render('reviews-new', {
      movieId: req.params.movieId
    });
  });

  // CREATE
  app.post('/movies/:movieId/reviews', (req, res) => {
    // console.log(req.body);
    Review.create(req.body)
      .then(review => {
        console.log(review)
        res.redirect(`/movies/${review.movieId}`);
      }).catch(error => {
        console.log(error.message);
      });
  });

  // SHOW
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      Comment.find({
        reviewId: review._id
      }).then(comments => {
        res.render('reviews-show', {
          review: review,
          comments: comments
        });
      });
    }).catch((err) => {
      console.log(err.message);
    })
  });




  //EDIT
  app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function (err, review) {
      res.render('reviews-edit', {
        review: review
      });
    })
  })

  // UPDATE
  app.put('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/movies/${review.movieId}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })


  // DELETE
  app.delete('/movies/:movieId/reviews/:id', (req, res) => {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect(`/movies/${review.movieId}`)
    }).catch((err) => {
      console.log(err.message);
    });
  });

};