import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '@/constants/colors';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  inputBackground: string;
}

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // Default to dark mode
  
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');
  
  const themeColors: ThemeColors = useMemo(() => {
    return isDark ? colors.dark : colors.light;
  }, [isDark]);
  
  const setTheme = useCallback((mode: ThemeMode) => {
    if (!mode || !['light', 'dark', 'system'].includes(mode)) {
      console.error('Invalid theme mode:', mode);
      return;
    }
    setThemeMode(mode);
  }, []);
  
  return useMemo(() => ({
    themeMode,
    isDark,
    colors: themeColors,
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    setTheme,
  }), [themeMode, isDark, themeColors, setTheme]);
});