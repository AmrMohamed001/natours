const Tour = require('./../models/tourModel');
const Book = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./factory');
const AppError = require('./../utils/appError');
const stripe = require('stripe')(process.env.SECRET_STRIPE);
/////////////////////////////////////////////////////
exports.getCheckoutSession = async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId); // to get the info of
  // tour
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email, //as the user don't need to fill it in check
    client_reference_id: req.params.tourId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
        quantity: 1,
      },
    ],
  });
  // 3) send session as a response
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.createBookingCheckout = async (req, res, next) => {
  const { user, tour, price } = req.query;
  if (!user && !tour && !price) return next();
  await Book.create({ user, tour, price });
  res.redirect(req.originalUrl.split('?')[0]);
};

exports.getBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book);
exports.addBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);
