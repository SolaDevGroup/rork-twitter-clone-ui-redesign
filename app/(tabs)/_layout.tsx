import { Tabs } from "expo-router";
import React from "react";
import BottomNavBar from '@/components/BottomNavBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="(matching)" />
      <Tabs.Screen name="(profile)" />
    </Tabs>
  );
}