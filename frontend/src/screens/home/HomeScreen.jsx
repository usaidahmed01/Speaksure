import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);

  const quickCards = [
    {
      title: 'Grammar Lessons',
      description: 'Learn English grammar step by step.',
      icon: 'book-outline',
      screen: 'Lessons',
    },
    {
      title: 'Dictionary',
      description: 'Search meanings and examples.',
      icon: 'search-outline',
      screen: 'Dictionary',
    },
    {
      title: 'Leaderboard',
      description: 'Compare your XP with other learners.',
      icon: 'trophy-outline',
      screen: 'Leaderboard',
    },
    {
      title: 'Profile',
      description: 'View your account and progress.',
      icon: 'person-outline',
      screen: 'Profile',
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.username}>{user?.username || 'Learner'} 👋</Text>

        <Text style={styles.heroDescription}>
          Continue your English learning journey with grammar lessons, quizzes,
          vocabulary practice, and XP rewards.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.totalXP || 0}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.completedLessons || 0}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.completedQuizzes || 0}</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <Text style={styles.sectionSubtitle}>Choose what you want to do next</Text>
      </View>

      <View style={styles.cardsGrid}>
        {quickCards.map((card) => (
          <TouchableOpacity
            key={card.title}
            style={styles.quickCard}
            onPress={() => navigation.navigate(card.screen)}
          >
            <View style={styles.iconBox}>
              <Ionicons name={card.icon} size={26} color={COLORS.primary} />
            </View>

            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Today’s Goal</Text>
        <Text style={styles.infoText}>
          Complete at least one grammar lesson and try one weekly quiz to earn
          more XP.
        </Text>
      </View>
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
    paddingTop: 55,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  welcomeText: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: 16,
    fontWeight: '700',
  },
  username: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },
  heroDescription: {
    color: COLORS.white,
    opacity: 0.95,
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
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
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
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
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 155,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFF3EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 18,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 6,
  },
  infoText: {
    color: COLORS.muted,
    lineHeight: 22,
  },
});