const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const User = require('./../models/usermodel');
//const Review = require('./../models/reviewModel');
/////////////////////////////////////////////
//schema

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name should be specified'],
      unique: true,
      trim: true,
      maxLength: [40, 'name should be lt 40'],
      minLength: [5, 'name should be gt 5'],
    },
    slug: {
      type: String,
    },

    duration: {
      type: Number,
      required: [true, 'enter the duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'enter the group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'enter the difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty should be E M D only',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'ratingsAverage lte 1'],
      max: [6, 'ratingsAverage gte 6'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'enter the price'],
    },
    priceDiscount: {
      type: Number,
      default: 0.1,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount is gt the price',
      },
    },
    summary: {
      type: String,
      trim: true, //to remove spaces
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'enter the cover image'],
    },
    images: {
      type: [String], //  array of strings
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secret: Boolean,
    startLocation: {
      //Geo data
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      description: String,
      address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: String,
        address: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: User,
      },
    ],
  },
  //options
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
///////////////////////////////////////////////////////////
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });
///////////////////////////////////////////////////////////
// virtual property
tourSchema.virtual('toWeek').get(function () {
  return (this.duration / 7).toFixed(2);
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// doc middle ware
// before save() , create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/* Emabad the tour guide in the tours
 tourSchema.pre('save',async function(next){
   const guidePromise = this.guides.map(async id => await User.findById(id))
   this.guides = await Promise.all(guidePromise)
   next()
 })*/

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -role',
  });
  next();
});
tourSchema.post('save', function (doc, next) {
  //console.log(doc);
  next();
});

//////////////////////////////////
// query middle ware
// before find()
tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } });
  next();
});
//////////////////////////////////
// aggrigation middle ware
/*tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secret: { $ne: true } } });
  next();
});*/
//////////////////////////////////
//model
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
