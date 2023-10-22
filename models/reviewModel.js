const mongoose = require('mongoose');
const User = require('./usermodel');
const Tour = require('./tourModel');
///////////////////////////////////////////////
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      set: (val) => Math.round(val * 10) / 10, //4.666667 => 46.66667 => 47
      // => 4.7
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, 'Review must belong to a user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: Tour,
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/////////////////////////////////////////////////
reviewSchema.index({ tour: 1, user: -1 }, { unique: true });
/////////////////////////////////////////////////
reviewSchema.statics.calcAvr = async function (tourId) {
  // this refers the model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        avrRating: { $avg: '$rating' },
        nRating: { $sum: 1 },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avrRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};
/////////////////////////////////////////////////

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.post('save', async function () {
  // this points to current review
  await this.constructor.calcAvr(this.tour);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  const query = this.clone(); // create a new copy of the query object to
  // prevent the error : Query was already executed
  const r = await query.findOne();
  this.curr = r;

  next();
});
reviewSchema.post(/^findOneAnd/, async function (doc) {
  await this.curr.constructor.calcAvr(this.curr.tour);
});

/////////////////////////////////////////////////
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
