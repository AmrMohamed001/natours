const express = require('express');
const viewController = require('./../controllers/viewController');
const bookController = require('./../controllers/bookingController');
const auth = require('./../controllers/authController');
const router = express.Router();
/////////////////////////////////////////////////////
router.get(
  '/',
  bookController.createBookingCheckout,
  auth.isLoggedIn,
  viewController.getOverview
);
router.get('/tour/:slug', auth.isLoggedIn, viewController.getTourView);
router.get('/login', auth.isLoggedIn, viewController.login);
router.get('/me', auth.protect, viewController.account);
router.get('/me-tours', auth.protect, viewController.myBookedTours);
router.post('/submit-user-data', auth.protect, viewController.updateUserData);
/////////////////////////////////////////////////////
module.exports = router;
