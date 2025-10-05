# Project Rules & Guidelines

This document contains strict rules and best practices for this React Native Expo project.

## 🎨 Layout & Spacing

### Horizontal Padding (CRITICAL)
- **ALL screens MUST use 12px horizontal padding**
- Import and use: `SCREEN_HORIZONTAL_PADDING` from `@/constants/layout`
- This applies to:
  - Screen containers
  - Headers
  - Content sections
  - List items
  - Any horizontally padded elements

```typescript
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING, // 12px
  },
});
```

## 📝 Input Fields

### Input Styling Rules
1. **Font Size**: Always use 16px to prevent iOS zoom
2. **No Borders**: Inputs should NOT have borders (borderWidth: 0)
3. **Background Only**: Use backgroundColor for visual separation
4. **Padding**: Use 12px horizontal and vertical padding

```typescript
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16, // Prevents iOS zoom
    color: colors.text,
    // NO borderWidth, NO borderColor
  },
});
```

## 📐 Spacing Constants

Use spacing constants from `@/constants/layout`:

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,  // STANDARD HORIZONTAL PADDING
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;
```

## 🎯 Safe Area

- Use `useSafeAreaInsets()` for screens without headers
- Use `SafeAreaView` from `react-native-safe-area-context`
- Headers and tabs automatically handle safe areas

## 🎨 Theme

- Always use theme colors from `useTheme()` hook
- Never hardcode colors except for pure white/black when necessary
- Available theme colors:
  - `colors.background`
  - `colors.surface`
  - `colors.text`
  - `colors.textSecondary`
  - `colors.border`
  - `colors.inputBackground`
  - `primary`
  - `error`

## 📱 Platform Compatibility

- Code must work on iOS, Android, AND Web
- Use Platform checks for platform-specific features
- Test web compatibility for all features

## 🔤 Typography

Font sizes from `@/constants/fonts`:
```typescript
export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,  // Standard for inputs
  lg: 18,
  xl: 20,
  xxl: 22,
  xxxl: 24,
};
```

## ✅ Checklist for New Screens

When creating a new screen:
- [ ] Use `SCREEN_HORIZONTAL_PADDING` (12px) for horizontal padding
- [ ] Input fields use 16px font size
- [ ] No borders on input fields
- [ ] Use theme colors (no hardcoded colors)
- [ ] Handle safe area properly
- [ ] Test on web compatibility
- [ ] Use TypeScript with proper types
- [ ] Add console logs for debugging

## 🚫 Common Mistakes to Avoid

1. ❌ Using `paddingHorizontal: 16` or `paddingHorizontal: 32`
   ✅ Use `paddingHorizontal: SCREEN_HORIZONTAL_PADDING`

2. ❌ Input with `borderWidth: 1`
   ✅ Input with `borderWidth: 0` and `backgroundColor`

3. ❌ Input with `fontSize: 14`
   ✅ Input with `fontSize: 16` (prevents iOS zoom)

4. ❌ Hardcoded colors like `#000` or `#fff`
   ✅ Use theme colors: `colors.text`, `colors.background`

5. ❌ Using `spacing.lg` (16px) for screen padding
   ✅ Use `SCREEN_HORIZONTAL_PADDING` (12px)

## 📚 Import Patterns

```typescript
// Layout constants
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';

// Theme
import { useTheme } from '@/contexts/ThemeContext';

// Fonts
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';

// Safe area
import { useSafeAreaInsets } from 'react-native-safe-area-context';
```

## 🔄 Updates

When this document is updated, all existing screens should be reviewed and updated to match the new rules.

Last updated: 2025-10-05
