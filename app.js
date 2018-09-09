
const reviewController = require('./controllers/reviews.js');
//const comments = require('./controllers/comments.js');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
var exphbs = require('express-handlebars');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
// handlebar
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


reviewController(app);
//comments(app);



// PORT
app.listen(port, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;
