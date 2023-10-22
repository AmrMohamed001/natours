const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');
////////////////////////////////////////////////////////////////
router.use(authController.protect);
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);
router.use(authController.giveAccessTo('admin'));
router
  .route('/')
  .get(bookingController.getBooks)
  .post(bookingController.addBook);
router
  .route('/:id')
  .get(bookingController.getBook)
  .patch(bookingController.updateBook)
  .delete(bookingController.deleteBook);
////////////////////////////////////////////////////////////////
module.exports = router;
