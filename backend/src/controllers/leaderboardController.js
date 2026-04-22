const User = require('../models/User');

// GET /api/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('username email totalXP completedLessons completedQuizzes')
      .sort({ totalXP: -1, completedLessons: -1 })
      .limit(20);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      username: user.username,
      email: user.email,
      totalXP: user.totalXP,
      completedLessons: user.completedLessons,
      completedQuizzes: user.completedQuizzes,
    }));

    res.status(200).json({
      status: 'Success',
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to fetch leaderboard',
      error: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};