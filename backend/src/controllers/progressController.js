const Progress = require('../models/Progress');

// GET /api/progress
const getMyProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .populate('lessonId')
      .populate('quizId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'Success',
      count: progress.length,
      progress,
      userStats: {
        totalXP: req.user.totalXP,
        completedLessons: req.user.completedLessons,
        completedQuizzes: req.user.completedQuizzes,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to fetch progress',
      error: error.message,
    });
  }
};

module.exports = {
  getMyProgress,
};