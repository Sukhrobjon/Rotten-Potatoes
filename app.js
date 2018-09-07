const express = require('express')
const methodOverride = require('method-override')
const app = express()
const reviews = require('./controllers/reviews');// connecting to reviews.js file
var exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


//MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



reviews(app);

// Index
// app.get('/', (req, res) => {
//   Review.find()
//     .then(reviews => {
//       res.render('reviews-index', { reviews: reviews });
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })


module.exports = app;
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
