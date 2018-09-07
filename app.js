const express = require('express')
const methodOverride = require('method-override')
const app = express()
const reviews = require('./controllers/reviews');// connecting to reviews.js file
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // INITIALIZE BODY-PARSER AND ADD IT TO APP


// MIDDLEWARE
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// Static content
// app.use(express.static("./public"));


//MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



reviews(app);


// Mongoose connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes';
mongoose.connect( mongoUri, { useNewUrlParser: true});
mongoose.set('debug', true);

// module.exports = app;
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
