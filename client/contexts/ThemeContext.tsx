import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeState, ThemeContextType, ColorPalette, TextContent } from './themeTypes';
import { ColorPreset } from '@/constants/colorPresets';
import { loadThemeFromStorage, saveThemeToStorage } from './themeStorage';
import { updateCSSVariables, loadCustomFont } from './themeCSSUpdater';
import {
  updateColorAction,
  toggleDarkModeAction,
  toggleRoundedAction,
  setFontSizeAction,
  setFontFamilyAction,
  setFontWeightAction,
  setCustomFontAction,
  resetPaletteAction,
  updateTextContentAction,
  resetTextContentAction,
  resetAllToDefaultsAction,
  applyPresetAction,
} from './themeActions';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ThemeState>(() => loadThemeFromStorage());

  // Save to localStorage and update CSS variables when state changes
  useEffect(() => {
    saveThemeToStorage(state);
    updateCSSVariables(state);

    // Load custom font if provided
    if (state.customFontUrl && state.customFontName) {
      loadCustomFont(state.customFontUrl, state.customFontName);
    }
  }, [state]);

  const updateColor = (key: keyof ColorPalette, value: string) => {
    setState((prev) => updateColorAction(prev, key, value));
  };

  const toggleDarkMode = () => {
    setState((prev) => toggleDarkModeAction(prev));
  };

  const toggleRounded = () => {
    setState((prev) => toggleRoundedAction(prev));
  };

  const setFontSize = (size: 'sm' | 'md' | 'lg') => {
    setState((prev) => setFontSizeAction(prev, size));
  };

  const setFontFamily = (family: string) => {
    setState((prev) => setFontFamilyAction(prev, family));
  };

  const setFontWeight = (weight: '400' | '500' | '600' | '700' | '800') => {
    setState((prev) => setFontWeightAction(prev, weight));
  };

  const setCustomFont = (url: string, name: string) => {
    setState((prev) => setCustomFontAction(prev, url, name));
  };

  const resetPalette = () => {
    setState((prev) => resetPaletteAction(prev));
  };

  const updateTextContent = (key: keyof TextContent, value: any) => {
    setState((prev) => updateTextContentAction(prev, key, value));
  };

  const resetTextContent = () => {
    setState((prev) => resetTextContentAction(prev));
  };

  const resetAllToDefaults = () => {
    setState(resetAllToDefaultsAction());
  };

  const applyPreset = (preset: ColorPreset) => {
    setState((prev) => applyPresetAction(prev, preset));
  };

  return (
    <ThemeContext.Provider
      value={{
        state,
        updateColor,
        toggleDarkMode,
        toggleRounded,
        setFontSize,
        setFontFamily,
        setFontWeight,
        setCustomFont,
        updateTextContent,
        resetPalette,
        resetTextContent,
        resetAllToDefaults,
        applyPreset,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
