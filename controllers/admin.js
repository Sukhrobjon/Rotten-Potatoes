//const express = require('express');
const Review = require('../models/review.js')

module.exports = function(app) {
// NEW Comment
    app.get('/admin', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('admin', {
                    reviews: reviews
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

    // ADMIND DELETE REVIEW
    app.delete('/admin/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id)
            .then(review => {
                res.status(200).send(review);
            }).catch(err => {
                res.status(400).send(err)
            });
    });
}

