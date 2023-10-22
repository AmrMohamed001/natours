const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/usersController');
const auth = require('./../controllers/authController');
////////////////////////////////////////

////////////////////////////////////////
// No need for authentication
router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logOut);
router.post('/forget-password', auth.forgetPassword);
router.patch('/reset-password/:token', auth.resetPassword);

// need for authentication
router.use(auth.protect);
router.patch('/update-password', auth.updatePassword);
router.patch(
  '/updateme',
  usersController.uploadUserPhoto,
  usersController.updateMe
);
router.delete('/deleteme', usersController.deleteMe);
router.get('/me', usersController.getMe, usersController.getUser);

// Need to be adminstrator
router.use(auth.giveAccessTo('admin'));
router.route('/').get(usersController.getAllUsers);
router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
////////////////////////////////////////
module.exports = router;
