import { Stack } from "expo-router";
import React from "react";

export default function MatchingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="matching"
        options={{
          title: "Matching",
        }}
      />
    </Stack>
  );
}
