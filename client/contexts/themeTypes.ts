import { ColorPreset } from '@/constants/colorPresets';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}

export interface TextContent {
  navbarBrand: string;
  navbarItems: string[];
  navbarCta: string;
  heroTitle: string;
  heroDescription: string;
  getStartedBtn: string;
  learnMoreBtn: string;
  cardTitle: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  footerCategories: Array<{
    name: string;
    links: string[];
  }>;
  footerCopyright: string;
}

export interface ThemeState {
  colors: ColorPalette;
  isDark: boolean;
  isRounded: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  fontFamily: string;
  fontWeight: '400' | '500' | '600' | '700' | '800';
  customFontUrl?: string;
  customFontName?: string;
  textContent: TextContent;
}

export interface ThemeContextType {
  state: ThemeState;
  updateColor: (key: keyof ColorPalette, value: string) => void;
  toggleDarkMode: () => void;
  toggleRounded: () => void;
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  setFontFamily: (family: string) => void;
  setFontWeight: (weight: '400' | '500' | '600' | '700' | '800') => void;
  setCustomFont: (url: string, name: string) => void;
  updateTextContent: (key: keyof TextContent, value: any) => void;
  generateRandomPalette: () => void;
  resetPalette: () => void;
  resetTextContent: () => void;
  resetAllToDefaults: () => void;
  applyPreset: (preset: ColorPreset) => void;
}
