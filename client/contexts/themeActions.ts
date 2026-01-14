import { ThemeState, ColorPalette, TextContent } from './themeTypes';
import { ColorPreset } from '@/constants/colorPresets';
import { DEFAULT_PALETTE, DEFAULT_DARK_PALETTE, DEFAULT_TEXT_CONTENT } from './themeConstants';

export const updateColorAction = (state: ThemeState, key: keyof ColorPalette, value: string): ThemeState => {
  return {
    ...state,
    colors: { ...state.colors, [key]: value },
  };
};

export const toggleDarkModeAction = (state: ThemeState): ThemeState => {
  const newDark = !state.isDark;
  const colors = { ...state.colors };

  // Adjust background/text for dark mode if using defaults
  if (newDark) {
    if (state.colors.bg === '0 0% 100%') {
      colors.bg = '0 0% 12%';
      colors.text = '0 0% 95%';
    }
  } else {
    if (state.colors.bg === '0 0% 12%') {
      colors.bg = '0 0% 100%';
      colors.text = '0 0% 10%';
    }
  }

  return { ...state, isDark: newDark, colors };
};

export const toggleRoundedAction = (state: ThemeState): ThemeState => {
  return { ...state, isRounded: !state.isRounded };
};

export const setFontSizeAction = (state: ThemeState, size: 'sm' | 'md' | 'lg'): ThemeState => {
  return { ...state, fontSize: size };
};

export const setFontFamilyAction = (state: ThemeState, family: string): ThemeState => {
  return {
    ...state,
    fontFamily: family,
    ...(state.customFontName && {
      customFontUrl: undefined,
      customFontName: undefined,
    }),
  };
};

export const setFontWeightAction = (state: ThemeState, weight: '400' | '500' | '600' | '700' | '800'): ThemeState => {
  return { ...state, fontWeight: weight };
};

export const setCustomFontAction = (state: ThemeState, url: string, name: string): ThemeState => {
  return { ...state, customFontUrl: url, customFontName: name };
};

export const generateRandomPaletteAction = (state: ThemeState): ThemeState => {
  // Generate a random base hue
  const baseHue = Math.floor(Math.random() * 360);

  // Choose a random harmony type
  const harmonyType = ['complementary', 'triadic', 'analogous', 'split-complementary'][Math.floor(Math.random() * 4)];

  let hueOffsets = [0, 60, 120]; // Default: triadic

  if (harmonyType === 'complementary') {
    hueOffsets = [0, 180];
  } else if (harmonyType === 'analogous') {
    hueOffsets = [0, 30, 330];
  } else if (harmonyType === 'split-complementary') {
    hueOffsets = [0, 150, 210];
  }

  // Vibrant saturation and lightness
  const saturation = Math.floor(Math.random() * 25 + 75); // 75-100%
  const primaryLightness = Math.floor(Math.random() * 15 + 48); // 48-63%

  // Create colors from harmony offsets
  const colors = hueOffsets.map((offset) => {
    const hue = (baseHue + offset) % 360;
    return `${hue} ${saturation}% ${primaryLightness}%`;
  });

  const bgLight = state.isDark ? '0 0% 12%' : '0 0% 100%';
  const textLight = state.isDark ? '0 0% 95%' : '0 0% 10%';

  return {
    ...state,
    colors: {
      primary: colors[0],
      secondary: colors[1],
      accent: colors.length > 2 ? colors[2] : `${(baseHue + 45) % 360} ${saturation}% ${primaryLightness}%`,
      bg: bgLight,
      text: textLight,
    },
  };
};

export const resetPaletteAction = (state: ThemeState): ThemeState => {
  return {
    ...state,
    colors: state.isDark ? { ...DEFAULT_DARK_PALETTE } : { ...DEFAULT_PALETTE },
  };
};

export const updateTextContentAction = (state: ThemeState, key: keyof TextContent, value: any): ThemeState => {
  return {
    ...state,
    textContent: {
      ...state.textContent,
      [key]: value,
    },
  };
};

export const resetTextContentAction = (state: ThemeState): ThemeState => {
  return {
    ...state,
    textContent: { ...DEFAULT_TEXT_CONTENT },
  };
};

export const resetAllToDefaultsAction = (): ThemeState => {
  // Clear navbar logo from localStorage
  localStorage.removeItem('navbar-logo');

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

export const applyPresetAction = (state: ThemeState, preset: ColorPreset): ThemeState => {
  return {
    ...state,
    colors: { ...preset.colors },
  };
};
