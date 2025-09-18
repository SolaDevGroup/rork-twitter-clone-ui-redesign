import { Tabs } from "expo-router";
import { Home, Search, Bell, Mail, User } from "lucide-react-native";
import React from "react";
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors, primary } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color }) => <Home size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          tabBarIcon: ({ color }) => <Search size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          tabBarIcon: ({ color }) => <Bell size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(messages)"
        options={{
          tabBarIcon: ({ color }) => <Mail size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ color }) => <User size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}