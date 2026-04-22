const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    console.log('REGISTER API HIT');
    console.log('REGISTER BODY:', req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email is already registered',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      status: 'Success',
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalXP: user.totalXP,
        completedLessons: user.completedLessons,
        completedQuizzes: user.completedQuizzes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 'IncorrectCredentials',
        message: 'Incorrect email or password',
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        status: 'IncorrectCredentials',
        message: 'Incorrect email or password',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      status: 'Success',
      message: 'User found successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalXP: user.totalXP,
        completedLessons: user.completedLessons,
        completedQuizzes: user.completedQuizzes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      status: 'Success',
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        totalXP: req.user.totalXP,
        completedLessons: req.user.completedLessons,
        completedQuizzes: req.user.completedQuizzes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Server error while fetching user',
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};