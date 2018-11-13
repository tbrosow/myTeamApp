var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var User = require('./models/user');

//connect to MongoDB
mongoose.connect('mongodb://localhost/gameApp', { useNewUrlParser: true });
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");


User.find({}, function (err, docs) {
  console.log("Users: " + JSON.stringify(docs, null, 4));
});

  // for (var key in db) { console.log (key, typeof key) ; }

  
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('/Users/Torsten/Programs/nodesql/auth/authenticationIntro'));

// serve static files from template
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 8080
app.listen(8080, function () {
  console.log('Express app listening on port 8080');
});