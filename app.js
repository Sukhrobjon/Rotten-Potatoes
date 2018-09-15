//express modules and declerations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;

//routers
const reviews = require('./controllers/reviews');
const comments = require('./controllers/comments');
const movies = require('./controllers/movies');

//mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rotten-potatoes", {useNewUrlParser: true});

// handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));


//linkinig the routes
reviews(app);
comments(app);
movies(app);

// PORT
app.listen(port, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;
