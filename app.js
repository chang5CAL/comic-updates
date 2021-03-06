var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var crawler = require('./routes/crawler');
var scraper = require('./routes/scraper');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('jade').renderFile);
app.set('view engine', 'jade');

// expose node-modules
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/crawler', crawler);
app.use('/scraper', scraper);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

app.all('*', (req, res, next) => {
  console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
  if (req.originalUrl.includes('/home') || req.originalUrl.includes('/random') || 
      req.originalUrl.includes('/comic') || req.originalUrl.includes('/genre'))  {
    console.log("called inside");
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
  } else if (!req.originalUrl.includes('/scraper') && !req.originalUrl.includes('/scraper')) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  } 
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


module.exports = app;
