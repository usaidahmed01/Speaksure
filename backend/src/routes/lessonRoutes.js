const express = require('express');

const {
  getLessons,
  getLessonsByWeek,
  getLessonById,
  completeLesson,
} = require('../controllers/lessonController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getLessons);
router.get('/week/:weekNo', protect, getLessonsByWeek);
router.get('/:id', protect, getLessonById);
router.post('/:id/complete', protect, completeLesson);

module.exports = router;