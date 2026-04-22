import React, { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';
import { fetchLessons } from '../../store/lessonSlice';

export default function LessonsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  const groupedLessons = useMemo(() => {
    const groups = {};

    items.forEach((lesson) => {
      if (!groups[lesson.weekNo]) {
        groups[lesson.weekNo] = [];
      }

      groups[lesson.weekNo].push(lesson);
    });

    return Object.keys(groups).map((weekNo) => ({
      weekNo,
      lessons: groups[weekNo],
    }));
  }, [items]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading lessons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchLessons())}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={groupedLessons}
      keyExtractor={(item) => item.weekNo.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.weekCard}>
          <View style={styles.weekHeader}>
            <View>
              <Text style={styles.weekTitle}>Week {item.weekNo}</Text>
              <Text style={styles.weekSubtitle}>{item.lessons.length} lessons</Text>
            </View>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => navigation.navigate('Quiz', { weekNo: Number(item.weekNo) })}
            >
              <Text style={styles.quizButtonText}>Quiz</Text>
            </TouchableOpacity>
          </View>

          {item.lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson._id}
              style={styles.lessonCard}
              onPress={() => navigation.navigate('LessonDetail', { lesson })}
            >
              <View style={styles.dayBadge}>
                <Text style={styles.dayText}>D{lesson.dayNo}</Text>
              </View>

              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <Text style={styles.xpText}>+{lesson.xpReward} XP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: COLORS.background,
    paddingBottom: 90,
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.muted,
    fontSize: 15,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  weekCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  weekTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  weekSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  quizButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
  },
  quizButtonText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3EE',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  dayBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dayText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  lessonDescription: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
    lineHeight: 18,
  },
  xpText: {
    marginTop: 6,
    color: COLORS.primary,
    fontWeight: '800',
  },
});