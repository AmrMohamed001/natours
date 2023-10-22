const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'book must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'book must belong to a user'],
  },
  price: {
    type: Number,
    required: [true, 'book must have price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});
bookSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
  });
  next();
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
