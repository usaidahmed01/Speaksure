import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LessonsScreen from '../screens/lessons/LessonsScreen';
import LessonDetailScreen from '../screens/lessons/LessonDetailScreen';
import QuizScreen from '../screens/lessons/QuizScreen';
import QuizResultScreen from '../screens/lessons/QuizResultScreen';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function LessonsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="LessonsList"
        component={LessonsScreen}
        options={{ title: 'Grammar Lessons' }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ title: 'Lesson Detail' }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Weekly Quiz' }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ title: 'Quiz Result' }}
      />
    </Stack.Navigator>
  );
}