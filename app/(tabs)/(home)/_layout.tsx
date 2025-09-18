import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="home" 
        options={{ 
          title: 'Home',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}