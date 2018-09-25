const express = require('express');
const app = express.Router();
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('35f16fb600ebe05de39a92fb561a38ae');
const Review = require('../models/review.js');

module.exports = function(app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {
                movies: response.results,
            });
        }).catch(console.error)
    });

    app.get('/movies/:id', (req, res) => {
        Review.find({movieId: req.params.id}).then(reviews => {
            moviedb.movieInfo({ id: req.params.id }).then(movie => {
                if (movie.video) {
                    moviedb.movieVideos({ id: req.params.id }).then(videos => {
                        movie.trailer_youtube_id = videos.results[0].key
                        renderTemplate(movie, reviews)
                    })
                } else {
                    renderTemplate(movie, reviews)
                }
    
                function renderTemplate(movie, reviews) {
                    res.render('movies-show', { movie: movie, reviews: reviews });
                }
    
            }).catch(console.error)
        })
    })
};

