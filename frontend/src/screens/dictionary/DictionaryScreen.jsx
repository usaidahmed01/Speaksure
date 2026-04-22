import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../constants/colors';
import { clearDictionary, searchWord } from '../../store/dictionarySlice';

export default function DictionaryScreen() {
  const dispatch = useDispatch();
  const { wordData, loading, error } = useSelector((state) => state.dictionary);

  const [word, setWord] = useState('');

  const handleSearch = () => {
    const cleanWord = word.trim().toLowerCase();

    if (!cleanWord) return;

    Keyboard.dismiss();
    dispatch(searchWord(cleanWord));
  };

  const handleClear = () => {
    setWord('');
    dispatch(clearDictionary());
  };

  const firstMeaning = wordData?.meanings?.[0];
  const firstDefinition = firstMeaning?.definitions?.[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dictionary</Text>
        <Text style={styles.subtitle}>
          Search English words and improve your vocabulary.
        </Text>
      </View>

      <View style={styles.searchCard}>
        <TextInput
          style={styles.input}
          placeholder="Type a word, e.g. confident"
          placeholderTextColor={COLORS.muted}
          value={word}
          onChangeText={setWord}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {wordData && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear Result</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Searching word...</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>No Result Found</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {wordData && !loading && (
        <View style={styles.resultCard}>
          <Text style={styles.word}>{wordData.word}</Text>

          {wordData.phonetic && (
            <Text style={styles.phonetic}>{wordData.phonetic}</Text>
          )}

          {firstMeaning?.partOfSpeech && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{firstMeaning.partOfSpeech}</Text>
            </View>
          )}

          {firstDefinition?.definition && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Meaning</Text>
              <Text style={styles.definition}>{firstDefinition.definition}</Text>
            </View>
          )}

          {firstDefinition?.example && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Example</Text>
              <Text style={styles.example}>“{firstDefinition.example}”</Text>
            </View>
          )}

          {firstMeaning?.synonyms?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Synonyms</Text>
              <Text style={styles.definition}>
                {firstMeaning.synonyms.slice(0, 6).join(', ')}
              </Text>
            </View>
          )}

          {wordData.meanings?.slice(1, 3).map((meaning, index) => (
            <View key={index} style={styles.extraMeaning}>
              <Text style={styles.extraPart}>{meaning.partOfSpeech}</Text>
              <Text style={styles.extraDefinition}>
                {meaning.definitions?.[0]?.definition}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  header: {
    paddingTop: 40,
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 6,
    lineHeight: 22,
  },
  searchCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#FFF3EE',
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  searchButtonText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 16,
  },
  clearButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  centerBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.muted,
  },
  errorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.danger,
    marginBottom: 6,
  },
  errorText: {
    color: COLORS.text,
    lineHeight: 22,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  word: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  phonetic: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3EE',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 12,
  },
  tagText: {
    color: COLORS.primary,
    fontWeight: '900',
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 6,
  },
  definition: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 23,
  },
  example: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 23,
    fontStyle: 'italic',
  },
  extraMeaning: {
    backgroundColor: '#FFF3EE',
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
  },
  extraPart: {
    color: COLORS.primary,
    fontWeight: '900',
    marginBottom: 4,
  },
  extraDefinition: {
    color: COLORS.text,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 6,
  },
  infoText: {
    color: COLORS.muted,
    lineHeight: 22,
  },
});