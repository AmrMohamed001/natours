const Tour = require('../models/tourModel');
const User = require('../models/usermodel');
const Book = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
////////////////////////////////////////////
exports.getOverview = catchAsync(async (req, res) => {
  // 1) get tour data from collection
  const tours = await Tour.find();
  //2)build templete =>(in pug templete)
  //3)render templete with our data
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTourView = catchAsync(async (req, res, next) => {
  //1) get the data
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  if (!tour) return next(new appError('No tour found with this name', 404));
  //2) build the templete
  //3) render it
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log in',
  });
});

exports.account = (req, res) => {
  res.status(200).render('account', {
    title: 'your-account',
  });
};

exports.updateUserData = async (req, res, next) => {
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).render('account', {
    title: req.user.name,
    user: updated,
  });
};

exports.myBookedTours = async (req, res, next) => {
  const booked = await Book.find({ user: req.user.id });
  const tours = booked.map((ele) => ele.tour);
  res.status(200).render('overview', {
    title: 'your-tours',
    tours,
  });
};
