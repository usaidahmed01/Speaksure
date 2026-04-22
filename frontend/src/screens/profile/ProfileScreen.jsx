import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, getThemeColors } from '../../constants/colors';
import { logout } from '../../store/authSlice';
import { fetchMyProgress } from '../../store/progressSlice';
import { toggleTheme } from '../../store/themeSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { progress, userStats, loading, error } = useSelector(
    (state) => state.progress
  );

  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getThemeColors(themeMode);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyProgress());
    }, [dispatch])
  );

  const renderProgressItem = ({ item }) => {
    const isLesson = item.type === 'lesson';

    const title = isLesson
      ? item.lessonId?.title || 'Grammar Lesson'
      : item.quizId?.title || 'Weekly Quiz';

    const subtitle = isLesson
      ? `Lesson completed • +${item.xpEarned} XP`
      : `Quiz score: ${item.score}/${item.totalQuestions} • +${item.xpEarned} XP`;

    return (
      <View
        style={[
          styles.progressCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={[styles.progressIcon, { backgroundColor: theme.inputBg }]}>
          <Ionicons
            name={isLesson ? 'book-outline' : 'help-circle-outline'}
            size={22}
            color={theme.primary}
          />
        </View>

        <View style={styles.progressInfo}>
          <Text style={[styles.progressTitle, { color: theme.text }]}>
            {title}
          </Text>
          <Text style={[styles.progressSubtitle, { color: theme.muted }]}>
            {subtitle}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <FlatList
        data={progress}
        keyExtractor={(item) => item._id}
        renderItem={renderProgressItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchMyProgress())}
            colors={[theme.primary]}
          />
        }
        ListHeaderComponent={
          <>
            <View style={[styles.header, { backgroundColor: theme.primary }]}>
              <View style={[styles.avatar, { backgroundColor: theme.white }]}>
                <Text style={[styles.avatarText, { color: theme.primary }]}>
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>

              <Text style={[styles.name, { color: theme.white }]}>
                {user?.username || 'Learner'}
              </Text>
              <Text style={[styles.email, { color: theme.white }]}>
                {user?.email}
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View
                style={[
                  styles.statCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {userStats.totalXP}
                </Text>
                <Text style={[styles.statLabel, { color: theme.muted }]}>
                  Total XP
                </Text>
              </View>

              <View
                style={[
                  styles.statCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {userStats.completedLessons}
                </Text>
                <Text style={[styles.statLabel, { color: theme.muted }]}>
                  Lessons
                </Text>
              </View>

              <View
                style={[
                  styles.statCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {userStats.completedQuizzes}
                </Text>
                <Text style={[styles.statLabel, { color: theme.muted }]}>
                  Quizzes
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.themeCard,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <View>
                <Text style={[styles.themeTitle, { color: theme.text }]}>
                  App Theme
                </Text>
                <Text style={[styles.themeSubtitle, { color: theme.muted }]}>
                  Current mode: {themeMode === 'dark' ? 'Dark' : 'Light'}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.themeButton, { backgroundColor: theme.primary }]}
                onPress={() => dispatch(toggleTheme())}
              >
                <Ionicons
                  name={themeMode === 'dark' ? 'sunny-outline' : 'moon-outline'}
                  size={18}
                  color={theme.white}
                />
                <Text style={[styles.themeButtonText, { color: theme.white }]}>
                  {themeMode === 'dark' ? 'Light' : 'Dark'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Progress History
              </Text>
              <Text style={[styles.sectionSubtitle, { color: theme.muted }]}>
                Your recent learning activities
              </Text>
            </View>

            {loading && progress.length === 0 && (
              <View
                style={[
                  styles.centerBox,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={[styles.loadingText, { color: theme.muted }]}>
                  Loading progress...
                </Text>
              </View>
            )}

            {error && progress.length === 0 && (
              <View
                style={[
                  styles.errorBox,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.errorText, { color: theme.danger }]}>
                  {error}
                </Text>
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View
              style={[
                styles.emptyBox,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Ionicons name="school-outline" size={42} color={theme.muted} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                No progress yet
              </Text>
              <Text style={[styles.emptyText, { color: theme.muted }]}>
                Complete lessons and quizzes to see your history here.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.primary }]}
            onPress={() => dispatch(logout())}
          >
            <Ionicons name="log-out-outline" size={20} color={theme.white} />
            <Text style={[styles.logoutText, { color: theme.white }]}>
              Logout
            </Text>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 18,
    paddingTop: 55,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primary,
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '700',
    marginTop: 4,
  },
  themeCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  themeSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  themeButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  themeButtonText: {
    fontWeight: '900',
    fontSize: 13,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    marginTop: 3,
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  progressIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.text,
  },
  progressSubtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
    lineHeight: 18,
  },
  centerBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  loadingText: {
    color: COLORS.muted,
    marginTop: 10,
  },
  errorBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: 'center',
  },
  emptyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 8,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 16,
  },
});