const express = require('express');

const {
  getQuizByWeek,
  submitQuiz,
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/week/:weekNo', protect, getQuizByWeek);
router.post('/:id/submit', protect, submitQuiz);

module.exports = router;