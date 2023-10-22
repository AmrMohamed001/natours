const multer = require('multer');
//const sharp = require('sharp');
const User = require('./../models/usermodel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./factory');

///////////////////////////////////////////////
// image upload
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    // user-userid-timestamp.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

//const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('This file isnot image', 400), false);
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single('photo');

// feature not work as i can't install sharp💥
exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

////////////////////////////////////////////////
// functions
const filteredObj = (obj, ...allowedFields) => {
  let theObj = {};
  Object.keys(obj).forEach((ele) => {
    if (allowedFields.includes(ele)) theObj[ele] = obj[ele];
  });
  return theObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)create err if the user passed password
  if (req.body.password || req.body.confirmPassword)
    return next(new AppError("you shouldn't enter password", 400));
  //2) update the doc
  const filtereqBody = filteredObj(req.body, 'name', 'email');
  if (req.file) filtereqBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filtereqBody, {
    new: true,
    runValidators: true,
  });
  //3)send response
  res.status(200).json({
    status: 'success',
    message: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    message: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
