import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';
import { fetchLeaderboard } from '../../store/leaderboardSlice';

export default function LeaderboardScreen() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.leaderboard);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchLeaderboard());
    }, [dispatch])
  );

  if (loading && users.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading leaderboard...</Text>
      </View>
    );
  }

  if (error && users.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top learners ranked by XP</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchLeaderboard())}
            colors={[COLORS.primary]}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{item.rank}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.stats}>
                Lessons: {item.completedLessons} • Quizzes: {item.completedQuizzes}
              </Text>
            </View>

            <View style={styles.xpBox}>
              <Text style={styles.xpValue}>{item.totalXP}</Text>
              <Text style={styles.xpLabel}>XP</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No users found yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  },
  header: {
    padding: 22,
    paddingTop: 55,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 6,
    fontSize: 15,
  },
  list: {
    padding: 18,
    paddingBottom: 90,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rankBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '900',
  },
  email: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  stats: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  xpBox: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  xpValue: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 16,
  },
  xpLabel: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  emptyBox: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.muted,
  },
});