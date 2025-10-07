import { Stack } from "expo-router";
import React from "react";

export default function MatchingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="matching"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
