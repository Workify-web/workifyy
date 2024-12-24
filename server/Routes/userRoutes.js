const express = require('express');
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// OTP routes
router.post('/verifyOTP', authController.verifyOtp);

// router.post('/revoke', authController.revokeToken);
router.route('/').get(userController.getAllUsers);

router.route('/onboarding', authController.protect, userController.onboarding);

module.exports = router;
