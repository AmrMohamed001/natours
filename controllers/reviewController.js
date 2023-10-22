const Review = require('./../models/reviewModel');

const factory = require('./factory');
////////////////////////////////////////////////////////
exports.setTourUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
};
exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.addReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
