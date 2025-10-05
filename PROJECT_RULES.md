# Project Rules & Guidelines

This document contains strict rules and best practices for this React Native Expo project.

## 🎨 Color System

### Theme Colors
- **Light Theme**: White background (#FFFFFF), dark text (#121212)
- **Dark Theme**: Dark background (#121212), white text (#FFFFFF)
- **Surface Colors**: 4% opacity overlays for subtle backgrounds
- **Text Secondary**: 64% opacity for secondary text
- **Success**: #37B874 (green)
- **Error**: #EE1045 (light) / #EE1045 (dark)
- **Always use a blur effect (16px) on backgrounds that have opacity**
- **When a button has no background, when hovered, apply a background 4% white or black, depending on the theme color, and 8% opacity when clicked**

### Color Usage Rules
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

## 📝 Typography

### Font System
- **Default Font**: Poppins
- **Font Sizes**: 8px to 24px (max)
- **Font Weights**: 400 (regular) to max 600 (SB)

### Display Typography Rule
For text 24px and above:
- Font weight: 600 (SB)
- Text transform: Capital 1st letter of each word
- Letter spacing: -0.5px
- Font family: Poppins

### Heading Styles
- **HS1**: 24px, 600 weight, regular case
- **HS2**: 18px, 600 weight, regular case

### Font Sizes
```typescript
export const fontSizes = {
  xs: 8,
  sm: 10,
  base: 12,
  md: 14,
  lg: 16,  // Standard for inputs
  xl: 18,
  xxl: 20,
  xxxl: 22,
  display: 24, // Maximum size
};
```

## 📏 Spacing & Layout

### Grid System
- **2pt Grid**: All spacing values are even numbers
- **Standard Gaps**: 2, 4, 6, 8, 12, 16, 24, 32px
- **Page Margins**: 12px horizontal
- **Critical Rule**: Never use margins - always use gaps for spacing

### Spacing Constants
```typescript
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,  // STANDARD HORIZONTAL PADDING
  xl: 16,
  xxl: 24,
  xxxl: 32,
} as const;
```

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

### Border Radius
- **Standard**: 12px maximum
- **Buttons**: Fully rounded (1000px)
- **Search Bars**: Fully rounded (1000px)
- **Toggles**: Fully rounded (1000px)

## 🔘 Component System

### Buttons
5 sizes (XS to XL) with consistent height, padding, and icon sizing:
- **XS**: 16px height, 8px padding
- **S**: 24px height, 10px padding
- **M**: 32px height, 12px padding
- **L**: 40px height, 14px padding
- **XL**: 48px height, 16px padding

### Button States
- **Inactive**: 64% opacity
- **Hover**: 82% opacity
- **Active**: 100% opacity

### Icon Rules
- **Size**: Always half the container height
- **Positioning**: Left icons for back/cancel, right icons for forward/confirm
- **Gap**: 8px between icon and text

### Input Components
- **Max Height**: 56px
- **Padding**: 12px horizontal
- **Border Radius**: 12px
- **Search Bars**: 40px height, fully rounded
- **Font Size**: Always use 16px to prevent iOS zoom
- **No Borders**: Inputs should NOT have borders (borderWidth: 0)
- **Background Only**: Use backgroundColor for visual separation

```typescript
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16, // Prevents iOS zoom
    color: colors.text,
    maxHeight: 56,
    // NO borderWidth, NO borderColor
  },
});
```

## 🖼️ Images & Media

### Profile Pictures
5 sizes: 12, 16, 32, 40, 48px - all fully rounded

### Standard Images
- **User profile pic**: 32px, fully rounded
- **Large Profile Pic**: 40px, fully rounded
- **Logos**: 40px, fully rounded

## 📱 Navigation & Headers

### Standard Header Pattern
- **Back Button**: 48x48px, fully rounded, icon should be half the size of the group (24px if parent is 48px)
  - 64% opacity for icon default state
  - 82% when parent group is hovered
  - 100% when clicked
- **Title**: 20px, Semibold, middle, left aligned
- **Spacer**: For visual balance
- **Blur Header**: For scroll states

## 🎯 Key Design Principles

1. **Consistency**: Use design system values consistently
2. **Accessibility**: Proper touch targets and contrast
3. **Performance**: Optimized for both mobile and web
4. **Modern UI**: Clean, minimal, Instagram-inspired design
5. **Cross-Platform**: Works on iOS, Android, and Web

## 🚫 Design Don'ts

- ❌ Don't ever use margins (use gaps instead)
- ❌ Don't exceed 24px font size
- ❌ Don't exceed 600 font weight
- ❌ Don't exceed 12px border radius (except buttons)
- ❌ Don't use odd spacing numbers
- ❌ Don't create inconsistent button states

## 🎯 Safe Area

- Use `useSafeAreaInsets()` for screens without headers
- Use `SafeAreaView` from `react-native-safe-area-context`
- Headers and tabs automatically handle safe areas

## 📱 Platform Compatibility

- Code must work on iOS, Android, AND Web
- Use Platform checks for platform-specific features
- Test web compatibility for all features

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
- [ ] Follow 2pt grid system (even numbers only)
- [ ] Use gaps instead of margins
- [ ] Button states follow opacity rules
- [ ] Icons are half the container height
- [ ] Border radius follows system rules

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

6. ❌ Using margins for spacing
   ✅ Use gaps for spacing

7. ❌ Font size above 24px
   ✅ Maximum 24px for display text

8. ❌ Font weight above 600
   ✅ Maximum 600 (Semibold)

9. ❌ Border radius above 12px (except buttons/search)
   ✅ 12px max, or fully rounded (1000px) for buttons

10. ❌ Odd spacing numbers (13px, 15px, etc.)
    ✅ Even numbers only (2pt grid system)

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
