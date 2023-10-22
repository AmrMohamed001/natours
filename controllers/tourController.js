const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./factory');
const AppError = require('./../utils/appError');
const multer = require('multer');
//const sharp = require('sharp');
///////////////////////////////////////////////////////
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/tours');
  },
  filename: (req, file, cb) => {
    // user-userid-timestamp.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `tour-${req.params.id}-${Date.now()}-cover.${ext}`);
  },
});

//const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('This file is not image', 400), false);
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadTourPhoto = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]); // tour images

///////////////////////////////////////////////////////
exports.alise = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,summary,difficulty,ratingsAverage';
  next();
};
exports.getTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.addTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getStats = catchAsync(async (req, res, next) => {
  let aggr = await Tour.aggregate([
    // stage : 1
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    // stage : 2
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avrRatings: { $avg: '$ratingsAverage' },
        avrPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    // stage : 3
    {
      $sort: {
        numTours: 1,
      },
    },
  ]);

  // SENDING RESPONSE
  res.status(200).json({
    status: 'success',
    message: aggr,
  });
});

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const plan = await Tour.aggregate([
    // 1.stage
    {
      $unwind: '$startDates',
    },
    // 2.stage
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    // 3.stage
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    // 4.stage
    {
      $addFields: { month: '$_id' },
    },
    // 5.stage
    {
      $sort: {
        month: 1,
      },
    },
    // 6.stage
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  // SENDING RESPONSE
  res.status(200).json({
    status: 'success',
    message: plan,
  });
});
///:distance/center/:latlng/unit/:unit
exports.getTourWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radious = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) next(new AppError('please enter valid location', 400));

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radious] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

exports.calcDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  if (!lat || !lng) next(new AppError('please enter valid location', 400));
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'Distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        name: 1,
        Distance: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: { distances },
  });
});
