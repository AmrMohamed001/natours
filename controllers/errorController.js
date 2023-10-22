const appError = require('./../utils/appError');
/////////////////////////////////////////////

const handleTokenError = (_) => {
  return new appError('invalid token , please login again', 401);
};

const handleExpiredToken = (_) => {
  return new appError('token expired, please login again', 401);
};
const handleInvalidIdDB = (err) => {
  let message = `Invalid ${err.path} : ${err.value}`;
  return new appError(message, 400);
};
const handleDuplicateValDB = (err) => {
  let messageErr = `duplicate field value: ${err.keyValue.name}`;
  return new appError(messageErr, 400);
};
const handleValidationDB = (err) => {
  let message = ` Invalid input data: ${Object.values(err.errors)
    .map((ele) => ele.message)
    .join('. ')}`;
  return new appError(message, 400);
};
const sendErrorDev = (req, res, err) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // b) Renderd website
    console.log(err.message);
    res.status(err.statusCode).render('error', {
      title: 'some thing went wrong',
      msg: err.message,
    });
  }
};
const sendErrorProd = (req, res, err) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'something went wrong!',
      });
    }
  } else {
    // B) Rendered website
    if (err.isOperational) {
      res.status(err.statusCode).render('error', {
        title: 'some thing went wrong',
        msg: err.message,
      });
    } else {
      console.error(err);
      res.status(err.statusCode).render('error', {
        title: 'some thing went wrong',
        msg: 'Please try again !',
      });
    }
  }
};
/////////////////////////////////////////////////////////////////////
// global error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= 'failed';

  if (process.env.NODE_ENV === 'development') sendErrorDev(req, res, err);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    // operational errors from mongodb driver
    if (err.name === 'CastError') error = handleInvalidIdDB(error);
    if (err.code === 11000) error = handleDuplicateValDB(error);
    if (err._message === 'Validation failed') error = handleValidationDB(error);
    if (err.name === 'JsonWebTokenError') error = handleTokenError();
    if (err.name === 'tokenExpiredError') error = handleExpiredToken();
    sendErrorProd(req, res, error);
  }
  next();
};
