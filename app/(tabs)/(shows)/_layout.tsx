import { Stack } from 'expo-router';
import React from 'react';

export default function ShowsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="shows" />
    </Stack>
  );
}