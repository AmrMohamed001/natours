const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'enter your name please'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user',
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, 'enter password'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'enter confirm password'],
    validate: {
      validator: function (ele) {
        return ele === this.password;
        // ONLY WORK SAVE(), CREATE() NOT REGULAR UPDATE()
      },
      message: 'confirm Password not equal password',
    },
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'enter valid mail'],
    required: [true, 'enter your mail'],
    unique: true,
    lowerCase: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordExpireIn: Date,
});
//////////////////////////////////////////////////////
userSchema.pre('save', async function (next) {
  // if the password in the current document not modified (created or change)
  if (!this.isModified('password')) return next();
  //else
  this.password = await bcrypt.hash(this.password, 12); // use async version
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
//////////////////////////////////////////////////////
userSchema.methods.checkPassword = async function (
  inputedPassword,
  storedPassword
) {
  return await bcrypt.compare(inputedPassword, storedPassword);
};

userSchema.methods.checkPasswordChanged = function (jwtTimeStemp) {
  if (this.passwordChangedAt) {
    //password changed
    const changedDate = this.passwordChangedAt.getTime() / 1000;
    console.log(changedDate, jwtTimeStemp);
    return jwtTimeStemp < changedDate;
  }
  return false; //not changed
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordExpireIn = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
//////////////////////////////////////////////////////
const User = mongoose.model('User', userSchema);
module.exports = User;
