import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/speaksure-logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <Text style={styles.logo}>SpeakSure</Text>

      <Text style={styles.title}>
        Learn English with lessons, quizzes and XP rewards.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 18,
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: 32,
    lineHeight: 26,
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});