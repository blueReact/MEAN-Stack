var express = require('express'),
    app = express(),
    favicon = require('serve-favicon'),
    path = require('path'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    compression = require('compression')
    morgan = require('morgan'),
    router = require('./routes/route');

/*
 * middlewares
 *
 */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan('common')); // console logger for dev only
app.use(compression());    // to make requests lighter and load faster
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

/*
 * routes
 *
 */
app.use('/', router);

// listening @ 3k port
app.listen(3000, function () {
  console.log('listening at port 3000...')
});