const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    weekNo: {
      type: Number,
      required: true,
    },
    dayNo: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    examples: {
      type: [String],
      default: [],
    },
    xpReward: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lesson', lessonSchema);