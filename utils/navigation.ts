import { router } from 'expo-router';

export function safeGoBack(fallbackRoute: string = '/(tabs)/(home)/home') {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackRoute as any);
  }
}
