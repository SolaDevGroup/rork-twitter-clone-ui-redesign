import { Platform } from 'react-native';

// Polyfill for react-native-reanimated on web
if (Platform.OS === 'web') {
  // Mock the global worklet runtime
  if (typeof global !== 'undefined') {
    (global as any)._WORKLET_RUNTIME = false;
    (global as any).__reanimatedWorkletInit = () => {};
    (global as any)._frameTimestamp = null;
    (global as any)._setGlobalConsole = () => {};
  }
  
  // Mock the window object properties that reanimated expects
  if (typeof window !== 'undefined') {
    (window as any)._WORKLET_RUNTIME = false;
    (window as any).__reanimatedWorkletInit = () => {};
    (window as any)._frameTimestamp = null;
    (window as any)._setGlobalConsole = () => {};
  }
}

export {};