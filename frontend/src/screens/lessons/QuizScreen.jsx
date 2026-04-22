import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';
import { fetchQuizByWeek, submitQuiz } from '../../store/quizSlice';

export default function QuizScreen({ route, navigation }) {
  const { weekNo } = route.params;

  const dispatch = useDispatch();
  const { currentQuiz, loading, submitting, error } = useSelector((state) => state.quiz);

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    dispatch(fetchQuizByWeek(weekNo));
  }, [dispatch, weekNo]);

  const handleSelectAnswer = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    if (!currentQuiz) return;

    if (Object.keys(answers).length !== currentQuiz.questions.length) {
      Alert.alert('Incomplete Quiz', 'Please answer all questions before submitting.');
      return;
    }

    const orderedAnswers = currentQuiz.questions.map((q) => answers[q.index]);

    const result = await dispatch(
      submitQuiz({
        quizId: currentQuiz.id,
        answers: orderedAnswers,
      })
    );

    if (submitQuiz.fulfilled.match(result)) {
      navigation.navigate('QuizResult');
    } else {
      Alert.alert('Error', result.payload || 'Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  if (error || !currentQuiz) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'Quiz not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchQuizByWeek(weekNo))}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.weekText}>Week {currentQuiz.weekNo}</Text>
        <Text style={styles.title}>{currentQuiz.title}</Text>
        <Text style={styles.subtitle}>
          Answer all questions and submit to earn XP.
        </Text>
      </View>

      {currentQuiz.questions.map((item, questionNo) => (
        <View key={item.index} style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Q{questionNo + 1}. {item.question}
          </Text>

          {item.options.map((option) => {
            const selected = answers[item.index] === option;

            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionBox, selected && styles.selectedOption]}
                onPress={() => handleSelectAnswer(item.index, option)}
              >
                <View style={[styles.radio, selected && styles.selectedRadio]} />
                <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.submitButtonText}>Submit Quiz</Text>
        )}
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
  loadingText: {
    marginTop: 12,
    color: COLORS.muted,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  headerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  weekText: {
    color: COLORS.primary,
    fontWeight: '900',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    color: COLORS.muted,
    fontSize: 15,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EE',
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    marginRight: 10,
  },
  selectedRadio: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  optionText: {
    flex: 1,
    color: COLORS.text,
    fontWeight: '700',
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 16,
  },
});