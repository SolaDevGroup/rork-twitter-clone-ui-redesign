import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface AnimatedSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  topics?: string[];
  animationInterval?: number;
}

export default function AnimatedSearchBar({
  value,
  onChangeText,
  topics = ['Search videos', 'Search music', 'Search gaming', 'Search sports', 'Search news'],
  animationInterval = 3000,
}: AnimatedSearchBarProps) {
  const { colors } = useTheme();
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused || value.length > 0) {
      return;
    }

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentTopicIndex((prevIndex) => (prevIndex + 1) % topics.length);
    }, animationInterval);

    return () => clearInterval(interval);
  }, [isFocused, value, topics.length, animationInterval, fadeAnim]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 1000,
      paddingHorizontal: 12,
      height: 44,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: colors.text,
    },
    placeholderContainer: {
      position: 'absolute',
      left: 40,
      pointerEvents: 'none',
    },
  });

  return (
    <View style={styles.container}>
      <Search size={20} color={colors.textSecondary} />
      {!isFocused && value.length === 0 && (
        <Animated.Text
          style={[
            styles.input,
            styles.placeholderContainer,
            { color: colors.textSecondary, opacity: fadeAnim },
          ]}
        >
          {topics[currentTopicIndex]}
        </Animated.Text>
      )}
      <TextInput
        style={styles.input}
        placeholder={isFocused ? 'Search...' : ''}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}
