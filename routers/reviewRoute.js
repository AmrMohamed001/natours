const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
/////////////////////////////////////////////////
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getReviews)
  .post(
    authController.giveAccessTo('user'),
    reviewController.setTourUserId,
    reviewController.addReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.giveAccessTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    authController.giveAccessTo('admin', 'user'),
    reviewController.deleteReview
  );

module.exports = router;
