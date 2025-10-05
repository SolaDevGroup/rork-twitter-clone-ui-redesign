/**
 * Layout Constants
 * 
 * STRICT RULES:
 * 1. All screens MUST use 12px (spacing.md) for left and right padding
 * 2. No border width on inputs - use backgroundColor only
 * 3. Input font size must be 16px to prevent zoom on iOS
 * 4. Use these constants consistently across all screens
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,  // STANDARD HORIZONTAL PADDING FOR ALL SCREENS
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const SCREEN_HORIZONTAL_PADDING = spacing.md; // 12px - USE THIS FOR ALL SCREENS

export const INPUT_RULES = {
  fontSize: 16,        // Prevents iOS zoom
  borderWidth: 0,      // No borders on inputs
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
} as const;
