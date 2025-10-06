import '@/utils/reanimated-polyfill';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { StyleSheet, LogBox, Platform } from "react-native";

// Ignore specific warnings - especially reanimated issues on web
if (Platform.OS === 'web') {
  // Suppress all reanimated warnings on web
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => {
    const message = args[0]?.toString() || '';
    if (message.includes('reanimated') || 
        message.includes('JSON Parse error') ||
        message.includes('worklet') ||
        message.includes('logger.ts') ||
        message.includes('JSReanimated')) {
      return;
    }
    originalWarn(...args);
  };
  
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    if (message.includes('reanimated') || 
        message.includes('JSON Parse error') ||
        message.includes('worklet') ||
        message.includes('logger.ts') ||
        message.includes('JSReanimated')) {
      return;
    }
    originalError(...args);
  };
}

LogBox.ignoreLogs([
  'JSON Parse error: Unexpected character',
  'react-native-reanimated',
  'logger.ts',
  'JSReanimated',
  'Unexpected character: o',
  'worklet',
  'Shared values are defined using',
  'Function that logs to LogBox',
  'Registers the logger configuration',
  'registerSensor',
  'this.platform',
]);

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="comments" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="create-post" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="search-results" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="camera-preview" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="camera-capture" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="video-player" options={{ headerShown: false }} />
      <Stack.Screen name="video-listing" options={{ headerShown: true }} />
      <Stack.Screen name="upload-video" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <GestureHandlerRootView style={styles.container}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}