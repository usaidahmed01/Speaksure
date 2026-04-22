const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');

// GET /api/quizzes/week/:weekNo
const getQuizByWeek = async (req, res) => {
  try {
    const weekNo = Number(req.params.weekNo);

    const quiz = await Quiz.findOne({ weekNo });

    if (!quiz) {
      return res.status(404).json({
        status: 'Error',
        message: 'Quiz not found',
      });
    }

    // Do not send correct answers to frontend
    const safeQuestions = quiz.questions.map((q, index) => ({
      index,
      question: q.question,
      options: q.options,
    }));

    res.status(200).json({
      status: 'Success',
      quiz: {
        id: quiz._id,
        weekNo: quiz.weekNo,
        title: quiz.title,
        xpReward: quiz.xpReward,
        questions: safeQuestions,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to fetch quiz',
      error: error.message,
    });
  }
};

// POST /api/quizzes/:id/submit
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Answers must be an array',
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        status: 'Error',
        message: 'Quiz not found',
      });
    }

    let correctCount = 0;

    const results = quiz.questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.correctAnswer;

      if (isCorrect) correctCount += 1;

      return {
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let xpEarned = 0;

    if (percentage >= 50) {
      xpEarned = quiz.xpReward;
    }

    if (percentage >= 80) {
      xpEarned += 20;
    }

    const alreadyCompleted = await Progress.findOne({
      userId: req.user._id,
      quizId: quiz._id,
      type: 'quiz',
    });

    if (!alreadyCompleted) {
      await Progress.create({
        userId: req.user._id,
        quizId: quiz._id,
        type: 'quiz',
        completed: true,
        score: correctCount,
        totalQuestions,
        xpEarned,
      });

      req.user.totalXP += xpEarned;
      req.user.completedQuizzes += 1;
      await req.user.save();
    } else {
      xpEarned = 0;
    }

    res.status(200).json({
      status: 'Success',
      message: alreadyCompleted
        ? 'Quiz already submitted. No extra XP awarded.'
        : 'Quiz submitted successfully',
      score: correctCount,
      totalQuestions,
      percentage,
      xpEarned,
      totalXP: req.user.totalXP,
      results,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to submit quiz',
      error: error.message,
    });
  }
};

module.exports = {
  getQuizByWeek,
  submitQuiz,
};