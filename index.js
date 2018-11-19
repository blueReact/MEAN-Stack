var express = require('express'),
    app = express(),
    favicon = require('serve-favicon'),
    path = require('path'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    compression = require('compression')
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    router = require('./routes/route'),
    registerRoute = require('./routes/registerRoute'),
    port = process.env.PORT || 3000;


// connect to mongodb
mongoose.connect('mongodb://localhost/meanAJS' , { useNewUrlParser: true });
mongoose.Promise = global.Promise;

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

// register route
app.use('/register', registerRoute);

// listening @ port
app.listen(port, function () {
  console.log('listening at port', port)
});