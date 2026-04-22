# SpeakSure - English Learning Mobile App

SpeakSure is a React Native mobile application designed to help users improve their English grammar, vocabulary, and learning confidence through structured lessons, quizzes, XP rewards, progress tracking, and leaderboard-based gamification.

The project is built using React Native with Expo for the frontend and Node.js, Express.js, and MongoDB for the backend.

---

## Project Overview

SpeakSure provides a simple and interactive English learning experience. Users can create an account, complete grammar lessons, attempt weekly quizzes, earn XP points, view their learning progress, search English word meanings using a public dictionary API, and compare their XP ranking on the leaderboard.

The application was developed as a university mobile app development project to demonstrate React Native concepts, API integration, navigation, Redux Toolkit state management, authentication, and backend connectivity.

---

## Main Features

- User signup and login
- JWT-based authentication
- Auth persistence using AsyncStorage
- Grammar lessons grouped by weeks
- Lesson detail screen with explanation and examples
- Lesson completion with XP rewards
- Weekly quiz system
- Quiz result and answer review
- Progress history
- Leaderboard based on total XP
- Public Dictionary API integration
- Profile screen with user statistics
- Dark/light theme toggle
- Responsive and clean mobile UI
- MongoDB Atlas database integration

---

## Technologies Used

### Frontend

- React Native
- Expo
- React Navigation
- Redux Toolkit
- Axios
- AsyncStorage
- Expo Vector Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- express-validator
- CORS
- dotenv

### Public API

- Free Dictionary API  
  `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

---

## Project Structure

```txt
React-Native-NEM/
├── frontend/
│   ├── assets/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── navigation/
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   ├── dictionary/
│   │   │   ├── home/
│   │   │   ├── leaderboard/
│   │   │   ├── lessons/
│   │   │   └── profile/
│   │   ├── store/
│   │   └── utils/
│   ├── App.js
│   ├── app.json
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── seed/
    │   └── server.js
    ├── .env
    └── package.json
