import { ThemeState } from './themeTypes';
import { DEFAULT_DARK_PALETTE, DEFAULT_TEXT_CONTENT, STORAGE_KEY } from './themeConstants';

export const loadThemeFromStorage = (): ThemeState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        colors: parsed.colors || { ...DEFAULT_DARK_PALETTE },
        isDark: parsed.isDark ?? true,
        isRounded: parsed.isRounded ?? true,
        fontSize: parsed.fontSize || 'md',
        fontFamily: parsed.fontFamily || 'PlusJakartaSans',
        fontWeight: parsed.fontWeight || '400',
        customFontUrl: parsed.customFontUrl,
        customFontName: parsed.customFontName,
        textContent: parsed.textContent || { ...DEFAULT_TEXT_CONTENT },
      };
    }
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error);
  }

  // Return default state
  return {
    colors: { ...DEFAULT_DARK_PALETTE },
    isDark: true,
    isRounded: true,
    fontSize: 'md',
    fontFamily: 'PlusJakartaSans',
    fontWeight: '400',
    textContent: { ...DEFAULT_TEXT_CONTENT },
  };
};

export const saveThemeToStorage = (state: ThemeState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
};
