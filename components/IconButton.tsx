import React, { useState } from 'react';
import {
  StyleSheet,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

type IconName = keyof typeof MaterialIcons.glyphMap;

type IconButtonProps = {
  icon: IconName;
  size?: 40 | 48;
  onPress: () => void;
  backgroundType?: 'solid' | 'blur';
  testID?: string;
};

export function IconButton({
  icon,
  size = 40,
  onPress,
  backgroundType = 'solid',
  testID,
}: IconButtonProps) {
  const { colors, isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const iconSize = size / 2;
  const padding = (size - iconSize) / 2;

  const getIconOpacity = () => {
    if (isPressed) return 1;
    if (isHovered) return 0.82;
    return 0.64;
  };

  const getBackgroundOpacity = () => {
    if (isPressed) return 0.08;
    if (isHovered) return 0.04;
    return 0.04;
  };

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: 1000,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    solidBackground: {
      backgroundColor: isDark
        ? `rgba(255, 255, 255, ${getBackgroundOpacity()})`
        : `rgba(0, 0, 0, ${getBackgroundOpacity()})`,
    },
    blurBackground: {
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.16)'
        : 'rgba(0, 0, 0, 0.16)',
    },
    pressable: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding,
    },
  });

  const content = (
    <Pressable
      style={styles.pressable}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => Platform.OS === 'web' && setIsHovered(true)}
      onHoverOut={() => Platform.OS === 'web' && setIsHovered(false)}
      testID={testID}
    >
      <MaterialIcons name={icon} size={iconSize} color={colors.text} style={{ opacity: getIconOpacity() }} />
    </Pressable>
  );

  if (backgroundType === 'blur' && Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <BlurView intensity={16} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, styles.blurBackground]} />
        <View style={StyleSheet.absoluteFill}>
          {content}
        </View>
      </View>
    );
  }

  if (backgroundType === 'blur' && Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.container,
          {
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          } as any,
          styles.blurBackground,
        ]}
      >
        <View style={StyleSheet.absoluteFill}>
          {content}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.solidBackground]}>
      <View style={StyleSheet.absoluteFill}>
        {content}
      </View>
    </View>
  );
}
