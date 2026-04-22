import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';

export default function QuizResultScreen({ navigation }) {
  const { result } = useSelector((state) => state.quiz);

  if (!result) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No Result Found</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LessonsList')}>
          <Text style={styles.buttonText}>Back to Lessons</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.smallText}>Quiz Completed</Text>
        <Text style={styles.scoreText}>
          {result.score}/{result.totalQuestions}
        </Text>
        <Text style={styles.percentageText}>{result.percentage}% Score</Text>
        <Text style={styles.xpText}>XP Earned: {result.xpEarned}</Text>
        <Text style={styles.messageText}>{result.message}</Text>
      </View>

      <Text style={styles.reviewTitle}>Answer Review</Text>

      {result.results?.map((item, index) => (
        <View key={index} style={styles.reviewCard}>
          <Text style={styles.questionText}>
            Q{index + 1}. {item.question}
          </Text>

          <Text style={styles.answerText}>
            Your Answer:{' '}
            <Text style={item.isCorrect ? styles.correct : styles.wrong}>
              {item.userAnswer || 'Not answered'}
            </Text>
          </Text>

          {!item.isCorrect && (
            <Text style={styles.answerText}>
              Correct Answer:{' '}
              <Text style={styles.correct}>{item.correctAnswer}</Text>
            </Text>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LessonsList')}>
        <Text style={styles.buttonText}>Back to Lessons</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 18,
    paddingBottom: 90,
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  smallText: {
    color: COLORS.white,
    opacity: 0.9,
    fontWeight: '800',
  },
  scoreText: {
    color: COLORS.white,
    fontSize: 52,
    fontWeight: '900',
    marginTop: 8,
  },
  percentageText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },
  xpText: {
    marginTop: 10,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  messageText: {
    color: COLORS.white,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 10,
    lineHeight: 22,
  },
  answerText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  correct: {
    color: COLORS.success,
    fontWeight: '900',
  },
  wrong: {
    color: COLORS.danger,
    fontWeight: '900',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 18,
  },
});