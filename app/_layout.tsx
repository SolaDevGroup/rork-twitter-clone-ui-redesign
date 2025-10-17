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
      <Stack.Screen name="create-post" options={{ headerShown: false }} />
      <Stack.Screen name="search-results" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="camera-preview" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="camera-capture" options={{ headerShown: false, animation: 'slide_from_left' }} />
      <Stack.Screen name="video-player" options={{ headerShown: false }} />
      <Stack.Screen name="video-listing" options={{ headerShown: true }} />
      <Stack.Screen name="upload-video" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="job-search" options={{ headerShown: false }} />
      <Stack.Screen name="job-listing" options={{ headerShown: false }} />
      <Stack.Screen name="job-detail" options={{ headerShown: false }} />
      <Stack.Screen name="account-settings" options={{ headerShown: false }} />
      <Stack.Screen name="security-settings" options={{ headerShown: false }} />
      <Stack.Screen name="premium-settings" options={{ headerShown: false }} />
      <Stack.Screen name="monetization-settings" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-settings" options={{ headerShown: false }} />
      <Stack.Screen name="notifications-settings" options={{ headerShown: false }} />
      <Stack.Screen name="accessibility-settings" options={{ headerShown: false }} />
      <Stack.Screen name="resources-settings" options={{ headerShown: false }} />
      <Stack.Screen name="account-information" options={{ headerShown: false }} />
      <Stack.Screen name="change-username" options={{ headerShown: false }} />
      <Stack.Screen name="change-password" options={{ headerShown: false }} />
      <Stack.Screen name="download-archive" options={{ headerShown: false }} />
      <Stack.Screen name="deactivate-account" options={{ headerShown: false }} />
      <Stack.Screen name="notification-filters" options={{ headerShown: false }} />
      <Stack.Screen name="notification-preferences" options={{ headerShown: false }} />
      <Stack.Screen name="email-notifications" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-audience" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-posts" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-location" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-discoverability" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-data-sharing" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-blocking" options={{ headerShown: false }} />
      <Stack.Screen name="premium-subscription" options={{ headerShown: false }} />
      <Stack.Screen name="premium-billing" options={{ headerShown: false }} />
      <Stack.Screen name="premium-benefits" options={{ headerShown: false }} />
      <Stack.Screen name="premium-badges" options={{ headerShown: false }} />
      <Stack.Screen name="monetization-earnings" options={{ headerShown: false }} />
      <Stack.Screen name="monetization-subscriptions" options={{ headerShown: false }} />
      <Stack.Screen name="monetization-payout" options={{ headerShown: false }} />
      <Stack.Screen name="monetization-analytics" options={{ headerShown: false }} />
      <Stack.Screen name="accessibility-vision" options={{ headerShown: false }} />
      <Stack.Screen name="accessibility-display" options={{ headerShown: false }} />
      <Stack.Screen name="accessibility-languages" options={{ headerShown: false }} />
      <Stack.Screen name="accessibility-data-usage" options={{ headerShown: false }} />
      <Stack.Screen name="resources-help-center" options={{ headerShown: false }} />
      <Stack.Screen name="resources-terms" options={{ headerShown: false }} />
      <Stack.Screen name="resources-privacy-policy" options={{ headerShown: false }} />
      <Stack.Screen name="resources-support" options={{ headerShown: false }} />
      <Stack.Screen name="resources-about" options={{ headerShown: false }} />
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
    const prepare = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
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