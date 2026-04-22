const dotenv = require('dotenv');

const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

dotenv.config();

const lessons = [
  {
    weekNo: 1,
    dayNo: 1,
    title: 'Simple Present Tense',
    description: 'Learn how to use simple present tense for habits and facts.',
    content:
      'Simple present tense is used to talk about habits, daily routines, general truths, and repeated actions. We use the base form of the verb with I, you, we, and they. With he, she, and it, we usually add s or es to the verb.',
    examples: [
      'I go to university every day.',
      'She speaks English well.',
      'The sun rises in the east.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 1,
    dayNo: 2,
    title: 'Simple Past Tense',
    description: 'Learn how to describe completed actions in the past.',
    content:
      'Simple past tense is used for actions that happened and finished in the past. Regular verbs usually end with ed, while irregular verbs have different past forms.',
    examples: [
      'I watched a movie yesterday.',
      'He visited his friend last week.',
      'They went to school in the morning.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 1,
    dayNo: 3,
    title: 'Simple Future Tense',
    description: 'Learn how to talk about future plans and predictions.',
    content:
      'Simple future tense is used to talk about actions that will happen in the future. We commonly use will or going to for future meaning.',
    examples: [
      'I will call you tomorrow.',
      'She will study tonight.',
      'They are going to play football.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 2,
    dayNo: 1,
    title: 'Articles: A, An, The',
    description: 'Understand the use of English articles.',
    content:
      'Articles are used before nouns. A and an are used for general singular nouns. The is used for specific nouns that are already known.',
    examples: [
      'I saw a cat.',
      'She is eating an apple.',
      'The book is on the table.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 2,
    dayNo: 2,
    title: 'Prepositions of Place',
    description: 'Learn common prepositions used for location.',
    content:
      'Prepositions of place tell us where something is. Common examples include in, on, under, beside, between, and behind.',
    examples: [
      'The bag is on the chair.',
      'The keys are in the drawer.',
      'The cat is under the table.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 2,
    dayNo: 3,
    title: 'Prepositions of Time',
    description: 'Learn how to use in, on, and at with time.',
    content:
      'We use at for specific times, on for days and dates, and in for months, years, seasons, and longer periods.',
    examples: [
      'I wake up at 7 AM.',
      'The meeting is on Monday.',
      'I was born in 1998.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 3,
    dayNo: 1,
    title: 'Modal Verbs',
    description: 'Learn can, could, should, must, and may.',
    content:
      'Modal verbs are helping verbs used to express ability, permission, advice, possibility, and obligation.',
    examples: [
      'I can speak English.',
      'You should practice daily.',
      'Students must submit the assignment.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 3,
    dayNo: 2,
    title: 'First Conditional',
    description: 'Learn how to talk about real future possibilities.',
    content:
      'The first conditional is used for real or possible situations in the future. The structure is: if + present simple, will + base verb.',
    examples: [
      'If it rains, I will stay home.',
      'If you study, you will pass.',
      'If she calls, I will answer.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 3,
    dayNo: 3,
    title: 'Second Conditional',
    description: 'Learn how to talk about imaginary situations.',
    content:
      'The second conditional is used for imaginary or unlikely situations. The structure is: if + past simple, would + base verb.',
    examples: [
      'If I had money, I would buy a car.',
      'If he studied more, he would pass.',
      'If I were you, I would apologize.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 4,
    dayNo: 1,
    title: 'Active and Passive Voice',
    description: 'Understand the difference between active and passive sentences.',
    content:
      'In active voice, the subject performs the action. In passive voice, the subject receives the action. Passive voice is formed using be + past participle.',
    examples: [
      'Active: The teacher explains the lesson.',
      'Passive: The lesson is explained by the teacher.',
      'Active: She wrote a letter.',
    ],
    xpReward: 10,
  },
  {
    weekNo: 4,
    dayNo: 2,
    title: 'Direct and Indirect Speech',
    description: 'Learn how to report what someone said.',
    content:
      'Direct speech repeats the exact words. Indirect speech reports the meaning of what was said, usually with changes in tense and pronouns.',
    examples: [
      'Direct: He said, "I am tired."',
      'Indirect: He said that he was tired.',
      'Direct: She said, "I like English."',
    ],
    xpReward: 10,
  },
  {
    weekNo: 4,
    dayNo: 3,
    title: 'Common Grammar Mistakes',
    description: 'Review common mistakes made by English learners.',
    content:
      'Many learners make mistakes with subject-verb agreement, articles, tenses, and prepositions. Reviewing these mistakes helps improve accuracy.',
    examples: [
      'Wrong: She go to school.',
      'Correct: She goes to school.',
      'Wrong: I am good in English.',
      'Correct: I am good at English.',
    ],
    xpReward: 10,
  },
];

const quizzes = [
  {
    weekNo: 1,
    title: 'Week 1 Tenses Quiz',
    xpReward: 30,
    questions: [
      {
        question: 'Choose the correct sentence.',
        options: [
          'She go to school.',
          'She goes to school.',
          'She going to school.',
          'She gone to school.',
        ],
        correctAnswer: 'She goes to school.',
      },
      {
        question: 'Which sentence is in simple past tense?',
        options: [
          'I eat breakfast.',
          'I will eat breakfast.',
          'I ate breakfast.',
          'I am eating breakfast.',
        ],
        correctAnswer: 'I ate breakfast.',
      },
      {
        question: 'Which word is used for simple future?',
        options: ['was', 'will', 'did', 'has'],
        correctAnswer: 'will',
      },
      {
        question: 'Select the correct simple present sentence.',
        options: [
          'He play football.',
          'He plays football.',
          'He played football.',
          'He playing football.',
        ],
        correctAnswer: 'He plays football.',
      },
      {
        question: 'Which sentence talks about the future?',
        options: [
          'She studied yesterday.',
          'She studies daily.',
          'She will study tomorrow.',
          'She is studying now.',
        ],
        correctAnswer: 'She will study tomorrow.',
      },
    ],
  },
  {
    weekNo: 2,
    title: 'Week 2 Articles and Prepositions Quiz',
    xpReward: 30,
    questions: [
      {
        question: 'Choose the correct article: I saw ___ elephant.',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 'an',
      },
      {
        question: 'Choose the correct article: ___ sun rises in the east.',
        options: ['A', 'An', 'The', 'No article'],
        correctAnswer: 'The',
      },
      {
        question: 'The book is ___ the table.',
        options: ['on', 'at', 'of', 'from'],
        correctAnswer: 'on',
      },
      {
        question: 'I wake up ___ 7 AM.',
        options: ['in', 'on', 'at', 'to'],
        correctAnswer: 'at',
      },
      {
        question: 'My birthday is ___ June.',
        options: ['at', 'on', 'in', 'under'],
        correctAnswer: 'in',
      },
    ],
  },
  {
    weekNo: 3,
    title: 'Week 3 Modals and Conditionals Quiz',
    xpReward: 30,
    questions: [
      {
        question: 'Which modal shows ability?',
        options: ['can', 'must', 'should', 'may'],
        correctAnswer: 'can',
      },
      {
        question: 'Choose the correct sentence.',
        options: [
          'You should to study.',
          'You should study.',
          'You should studying.',
          'You should studied.',
        ],
        correctAnswer: 'You should study.',
      },
      {
        question: 'If it rains, I ___ stay home.',
        options: ['will', 'would', 'was', 'did'],
        correctAnswer: 'will',
      },
      {
        question: 'If I had money, I ___ buy a car.',
        options: ['will', 'would', 'am', 'have'],
        correctAnswer: 'would',
      },
      {
        question: 'Which modal shows obligation?',
        options: ['must', 'can', 'may', 'could'],
        correctAnswer: 'must',
      },
    ],
  },
  {
    weekNo: 4,
    title: 'Week 4 Final Grammar Quiz',
    xpReward: 30,
    questions: [
      {
        question: 'Passive voice of "She writes a letter" is:',
        options: [
          'A letter is written by her.',
          'A letter writes her.',
          'She is written by a letter.',
          'A letter wrote by her.',
        ],
        correctAnswer: 'A letter is written by her.',
      },
      {
        question: 'Indirect speech of: He said, "I am tired."',
        options: [
          'He said that he is tired.',
          'He said that he was tired.',
          'He said he tired.',
          'He said that I was tired.',
        ],
        correctAnswer: 'He said that he was tired.',
      },
      {
        question: 'Correct the sentence: She go to school.',
        options: [
          'She goes to school.',
          'She going to school.',
          'She gone to school.',
          'She went school.',
        ],
        correctAnswer: 'She goes to school.',
      },
      {
        question: 'Which is correct?',
        options: [
          'I am good in English.',
          'I am good at English.',
          'I am good on English.',
          'I am good of English.',
        ],
        correctAnswer: 'I am good at English.',
      },
      {
        question: 'In passive voice, the subject usually:',
        options: [
          'performs the action',
          'receives the action',
          'removes the action',
          'changes the action',
        ],
        correctAnswer: 'receives the action',
      },
    ],
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Lesson.deleteMany();
    await Quiz.deleteMany();

    await Lesson.insertMany(lessons);
    await Quiz.insertMany(quizzes);

    console.log('Seed data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Lesson.deleteMany();
    await Quiz.deleteMany();

    console.log('Seed data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Destroy Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}