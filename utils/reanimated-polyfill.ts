import { Platform } from 'react-native';

// Enhanced polyfill for react-native-reanimated on web
if (Platform.OS === 'web') {
  // Mock reanimated functions that cause JSON parse errors
  const mockWorklet = () => {
    'worklet';
    return undefined;
  };

  // Override console methods to suppress reanimated errors
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('JSON Parse error') ||
      message.includes('Unexpected character: o') ||
      message.includes('worklet') ||
      message.includes('reanimated') ||
      message.includes('logger.ts') ||
      message.includes('JSReanimated') ||
      message.includes('registerSensor') ||
      message.includes('this.platform')
    ) {
      return;
    }
    originalConsoleError(...args);
  };
  
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('JSON Parse error') ||
      message.includes('Unexpected character: o') ||
      message.includes('worklet') ||
      message.includes('reanimated') ||
      message.includes('logger.ts') ||
      message.includes('JSReanimated') ||
      message.includes('registerSensor') ||
      message.includes('this.platform')
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };

  // Mock global reanimated functions
  if (typeof global !== 'undefined') {
    (global as any)._WORKLET = false;
    (global as any)._WORKLET_RUNTIME = false;
    (global as any).__reanimatedWorkletInit = mockWorklet;
    (global as any)._frameTimestamp = null;
    (global as any)._setGlobalConsole = () => {};
    (global as any)._log = () => {};
    (global as any)._updateProps = () => {};
  }

  // Mock window functions that might be called by reanimated
  if (typeof window !== 'undefined') {
    (window as any)._WORKLET = false;
    (window as any)._WORKLET_RUNTIME = false;
    (window as any).__reanimatedWorkletInit = mockWorklet;
    (window as any)._frameTimestamp = null;
    (window as any)._setGlobalConsole = () => {};
    (window as any)._log = () => {};
    (window as any)._updateProps = () => {};
  }
}

export {};