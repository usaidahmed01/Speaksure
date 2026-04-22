import React from 'react';
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
import { completeLesson } from '../../store/lessonSlice';

export default function LessonDetailScreen({ route }) {
  const { lesson } = route.params;
  const dispatch = useDispatch();
  const { completing } = useSelector((state) => state.lessons);

  const handleComplete = async () => {
    const result = await dispatch(completeLesson(lesson._id));

    if (completeLesson.fulfilled.match(result)) {
      Alert.alert(
        'Lesson Completed',
        result.payload.xpEarned > 0
          ? `Great! You earned ${result.payload.xpEarned} XP.`
          : 'You already completed this lesson.'
      );
    } else {
      Alert.alert('Error', result.payload || 'Failed to complete lesson');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.weekText}>Week {lesson.weekNo} • Day {lesson.dayNo}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{lesson.xpReward} XP</Text>
        </View>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>Explanation</Text>
        <Text style={styles.content}>{lesson.content}</Text>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>Examples</Text>
        {lesson.examples?.map((example, index) => (
          <View key={index} style={styles.exampleBox}>
            <Text style={styles.exampleNumber}>{index + 1}</Text>
            <Text style={styles.exampleText}>{example}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.completeButton, completing && styles.disabledButton]}
        onPress={handleComplete}
        disabled={completing}
      >
        {completing ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.completeButtonText}>Mark Lesson Complete</Text>
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
    fontWeight: '800',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 22,
  },
  xpBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3EE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 14,
  },
  xpText: {
    color: COLORS.primary,
    fontWeight: '900',
  },
  contentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 25,
  },
  exampleBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3EE',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  exampleNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '900',
    marginRight: 10,
  },
  exampleText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
});