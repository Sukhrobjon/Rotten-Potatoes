const Comment = require('../models/comment.js');
const Review = require('../models/review.js')
module.exports = function (app) {

// CREATE Comment
app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
        res.redirect(`/movies/:movieId/reviews/${comment.reviewId}`)
    }).catch((err) => {
        console.log(err.message)
    })
});

    // DELETE
    app.delete('/movies/:moviesId/reviews/:reviewsId/comments/:id', function (req, res) {
        console.log("DELETE comment")
            Comment.findByIdAndRemove(req.params.id).then((comment) => {
                res.redirect(`/movies/:moviesId/reviews/${comment.reviewId}`);
            }).catch((err) => {
        console.log(err.message);
        })
    });

};



