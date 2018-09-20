const Comment = require('../models/comment.js');
const Review = require('../models/review.js')
module.exports = function (app) {

    // CREATE Comment
    app.post('/movies/:movieId/reviews/comments', (req, res) => {
        console.log("comment created")
        Comment.create(req.body).then(comment => {
            res.status(200).send({
                comment: comment
            });
        }).catch((err) => {
            res.status(400).send({
                err: err
            })
        })
    });


    // DELETE
    app.delete('/movies/:moviesId/reviews/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/movies/:moviesId/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    });

};