import { Stack } from 'expo-router';
import React from 'react';

export default function ShortsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="shorts" />
      <Stack.Screen name="live" />
    </Stack>
  );
}
