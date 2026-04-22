const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

// GET /api/lessons
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ weekNo: 1, dayNo: 1 });

    res.status(200).json({
      status: 'Success',
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to fetch lessons',
      error: error.message,
    });
  }
};

// GET /api/lessons/week/:weekNo
const getLessonsByWeek = async (req, res) => {
  try {
    const weekNo = Number(req.params.weekNo);

    const lessons = await Lesson.find({ weekNo }).sort({ dayNo: 1 });

    res.status(200).json({
      status: 'Success',
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to fetch week lessons',
      error: error.message,
    });
  }
};

// GET /api/lessons/:id
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        status: 'Error',
        message: 'Lesson not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to fetch lesson',
      error: error.message,
    });
  }
};

// POST /api/lessons/:id/complete
const completeLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        status: 'Error',
        message: 'Lesson not found',
      });
    }

    const alreadyCompleted = await Progress.findOne({
      userId: req.user._id,
      lessonId: lesson._id,
      type: 'lesson',
    });

    if (alreadyCompleted) {
      return res.status(200).json({
        status: 'Success',
        message: 'Lesson already completed',
        xpEarned: 0,
      });
    }

    await Progress.create({
      userId: req.user._id,
      lessonId: lesson._id,
      type: 'lesson',
      completed: true,
      xpEarned: lesson.xpReward,
    });

    req.user.totalXP += lesson.xpReward;
    req.user.completedLessons += 1;
    await req.user.save();

    res.status(200).json({
      status: 'Success',
      message: 'Lesson completed successfully',
      xpEarned: lesson.xpReward,
      totalXP: req.user.totalXP,
      completedLessons: req.user.completedLessons,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to complete lesson',
      error: error.message,
    });
  }
};

module.exports = {
  getLessons,
  getLessonsByWeek,
  getLessonById,
  completeLesson,
};