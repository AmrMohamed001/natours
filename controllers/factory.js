const catchAsync = require('./../utils/catchAsync');
const appError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
////////////////////////////////////////////////////////

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    let doc = await query;
    if (!doc) return next(new appError('Tour not found', 404));
    // SENDING RESPONSE
    res.status(200).json({
      status: 'success',
      data: { doc },
    });
  });
};

exports.getAll = (model) => {
  return catchAsync(async (req, res, next) => {
    // Allow access to nested route (tour/review)
    let filterObj = {};
    if (req.params.tourId) filterObj = { tour: req.params.tourId };

    let apiF = new ApiFeatures(model.find(filterObj), req.query)
      .filter()
      .sort()
      .project()
      .pagination();
    const doc = await apiF.query;

    // SENDING RESPONSE
    res.status(200).json({
      status: 'success',
      result: doc.length,
      requestTime: req.requestTime,
      message: { doc },
    });
  });
};
exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc = await Model.create(req.body);

    // SENDING RESPONSE
    res.status(201).json({
      status: 'success',
      data: { doc },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    //image Cover
    if (req.files.imageCover)
      req.body.imageCover = req.files.imageCover[0].filename;
    //images
    if (req.files.images) {
      req.body.images = [];
      req.files.images.forEach((file, i) => {
        req.body.images.push(file.filename);
      });
    }
    let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new appError('Doc not found', 404));
    // SENDING RESPONSE
    res.status(200).json({
      status: 'success',
      message: doc,
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new appError('Doc not found', 404));
    // SENDING RESPONSE
    res.status(204).json({
      status: 'Deleted',
      message: null,
    });
  });
};
