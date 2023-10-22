class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('5') ? 'Server Error' : 'Failed';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = appError;
