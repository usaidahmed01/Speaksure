import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';
import { registerUser } from '../../store/authSlice';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from '../../utils/validators';

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || !cleanEmail || !password) {
      Alert.alert('Missing Fields', 'Please fill all fields.');
      return;
    }

    if (!isValidUsername(cleanUsername)) {
      Alert.alert('Invalid Username', 'Username must be at least 3 characters.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address, for example: user@example.com'
      );
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    const result = await dispatch(
      registerUser({
        username: cleanUsername,
        email: cleanEmail,
        password,
      })
    );

    if (registerUser.rejected.match(result)) {
      Alert.alert('Signup Failed', result.payload || 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Image
            source={require('../../../assets/images/speaksure-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join SpeakSure and start learning English with lessons, quizzes and XP.
        </Text>

        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={20} color={COLORS.muted} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.muted}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="mail-outline" size={20} color={COLORS.muted} />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={COLORS.muted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.muted} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={21}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.hintText}>
          Password must contain at least 6 characters.
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoBox: {
    width: 95,
    height: 95,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 38,
    fontWeight: '900',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 28,
  },
  inputGroup: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 10,
  },
  hintText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: -4,
    marginBottom: 14,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  link: {
    textAlign: 'center',
    color: COLORS.muted,
    fontWeight: '700',
  },
  linkBold: {
    color: COLORS.primary,
    fontWeight: '900',
  },
});