const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 2;
        },
        message: 'At least two options are required',
      },
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    weekNo: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    xpReward: {
      type: Number,
      default: 30,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);