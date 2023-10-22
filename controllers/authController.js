const crypto = require('crypto');
const utils = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
//////////////////////////////////////////////////////
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const sendResWithToken = (user, status, res) => {
  let token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true, // you can't manipulate the cookie in the browser
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // remove the password in the response in (signup or login)
  user.password = undefined;

  res.status(status).json({
    status: 'success',
    token,
    data: user,
  });
};
exports.signup = catchAsync(async (req, res) => {
  let newUser = await User.create(req.body);
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();
  sendResWithToken(newUser, 201, res);
});

exports.logOut = (req, res) => {
  res.cookie('jwt', 'loggingOut', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({ status: 'success' });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email & password exists
  if (!email || !password)
    return next(new AppError('email or password is not exist', 400));
  //2) check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password'); //as password should be hidden
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('email or password is not correct', 401));

  //3) if every thing is ok , give the token
  sendResWithToken(user, 201, res);
};

//Access
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1) get the token and check if it exists:
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) token = req.cookies.jwt;
  if (!token) return next(new AppError('You are not logging in', 401));
  //console.log(token);

  //2) verification token
  const decoded = await utils.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  //3) check if the user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('token of user not exist', 401));

  //4)check if user changed password after the token was issued
  if (currentUser.checkPasswordChanged(decoded.iat))
    return next(new AppError('user changed password,try again !', 401));

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// for Rendering
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify the token from cookie
      const decoded = await utils.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //2) check if the user still exist
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      //3)check if user changed password after the token was issued
      if (currentUser.checkPasswordChanged(decoded.iat)) return next();

      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

// Authorization
exports.giveAccessTo = (...roles) => {
  // clouser => function returned has access to roles
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('your role is not allowed to do that', 403));
    next();
  };
};

//forget password
exports.forgetPassword = async (req, res, next) => {
  // 1) get user from the posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('user is not found', 404));

  // 2) generate random reset token
  const token = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // send the url to mail
  try {
    const url = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/reset-password/${token}`;
    await new Email(user, url).sendResetPassword();

    res.status(200).json({
      status: 'success',
      message: 'email sent',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordExpireIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('error sending the mail', 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  // 1) get the user from the passed token and validate it
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordExpireIn: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('error with the token as expired', 400));
  // 2) change the password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordExpireIn = undefined;
  await user.save();
  // 3) update changedAt property
  // <<Done as middleware pre save hook>>
  // 4) log the user in
  const token = generateToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
  });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1)get the user
  let user = await User.findById(req.user._id).select('+password');
  // 2) check if the posted password is correct
  if (!(await user.checkPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('password is not the same', 401));
  //3)if so update the password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  //4)log the user in
  let token = generateToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
  });
});
