const express = require('express');
const { body } = require('express-validator');

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters'),

    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail()
      .custom((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(value)) {
          throw new Error('Please enter a valid email address');
        }

        return true;
      }),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail()
      .custom((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(value)) {
          throw new Error('Please enter a valid email address');
        }

        return true;
      }),

    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  loginUser
);

router.get('/me', protect, getMe);

module.exports = router;