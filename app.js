const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const tourRoute = require('./routers/tourRoute');
const userRoute = require('./routers/userRoute');
const reviewRoute = require('./routers/reviewRoute');
const viewRoute = require('./routers/viewRouter');
const bookingRoute = require('./routers/bookingRoute');
const appError = require('./utils/appError');
const globalError = require('./controllers/errorController');
/////////////////////////////////////////
const app = express();
/////////////////////////////////////////
// Rendering using pug templete:
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); //serving static files
/////////////////////////////////////////

// Global Middle wares

// to add security headers
app.use(helmet({ contentSecurityPolicy: false }));

//limit requests to certain ip for a time
const limiter = rateLimit({
  max: 10,
  window: 60 * 60 * 1000,
  message: 'Too many requests from the same IP , try again after 1hour',
});
app.use('/api', limiter);

//body parser , reading data from req.body
//we can limit the amount of data we get from the body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // to parse the
// data from the form into req.body
// the data from the form is sent by using urlEncoding to the router
app.use(cookieParser());

//SANITIZATION
//1)sanitization against no sql query injection
app.use(mongoSanitize());
//2)sanitization against xss
app.use(xss());

// Prevent parameter pollutuin
app.use(
  hpp({
    whitelist: ['duration', 'price'],
  })
);

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
// new change to show the commit
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
//  GET /api/v1/tours 200 4.945 ms - 8797
/////////////////////////////////////////////
// mounting routers
app.use('/', viewRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.all('*', (req, res, next) => {
  /*res.status(404).json({
                    status: 'failed',
                    message: 'route is not handeld yet',
                  });
                  next();*/
  ////////////
  /*const err = new Error('route is not handeld yet');
                  err.statusCode = 404;
                  err.status = 'not handeld';
                  next(err);*/
  const err = new appError('route is not handeld yet', 404);
  next(err);
});

////////////////////////////////////////////////////////
// error handeling in one central middle ware
app.use(globalError);
///////////////////////////////////////////
module.exports = app;
