const express = require('express');
const router = express.Router();
const controller = require('./../controllers/tourController');
const reviewRouter = require('./../routers/reviewRoute');
const authController = require('./../controllers/authController');
////////////////////////////////////////////////////////////////
// Nested-Route
router.use('/:tourId/reviews', reviewRouter);
/////////////////////////////////////////////////////////////////
router.route('/top-five-cheap').get(controller.alise, controller.getTours);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.giveAccessTo('admin', 'guide'),
    controller.monthlyPlan
  );
router.route('/get-stats').get(controller.getStats);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(controller.getTourWithin);

router.route('/distances/:latlng/unit/:unit').get(controller.calcDistances);

router
  .route('/')
  .get(controller.getTours)
  .post(
    authController.protect,
    authController.giveAccessTo('admin', 'guide'),
    controller.addTour
  );
router
  .route('/:id')
  .get(controller.getTour)
  .patch(
    authController.protect,
    authController.giveAccessTo('admin'),
    controller.uploadTourPhoto,
    controller.updateTour
  )
  .delete(
    authController.protect,
    authController.giveAccessTo('admin', 'guide'),
    controller.deleteTour
  );

/*router
  .route('/:tourId/reviews')
  .post(authController.protect, reviewController.addReview);*/
////////////////////////////////////////////////////////////////
module.exports = router;
