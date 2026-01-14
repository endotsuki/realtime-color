import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const DEFAULT_PALETTE: ColorPalette = {
  primary: '265 85% 50%',
  secondary: '190 85% 50%',
  accent: '20 90% 50%',
  bg: '0 0% 100%',
  text: '0 0% 10%',
};

export const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '265 85% 50%',
  secondary: '190 85% 50%',
  accent: '20 90% 50%',
  bg: '0 0% 12%',
  text: '0 0% 95%',
};

export const FONT_FAMILIES = {
  PlusJakartaSans: '"Plus Jakarta Sans", sans-serif',
  Roboto: '"Roboto", sans-serif',
  Georgia: 'Georgia, "Times New Roman", serif',
  Courier: '"Courier New", monospace',
  Verdana: 'Verdana, Geneva, sans-serif',
  ComicSans: '"Comic Sans MS", cursive',
};

export const DEFAULT_TEXT_CONTENT: TextContent = {
  navbarBrand: 'Color Studio',
  navbarItems: ['Home', 'Features', 'Pricing'],
  navbarCta: 'Try Free',
  heroTitle: 'Design Your Perfect Color System in Minutes',
  heroDescription:
    'Create, customize, and export beautiful color palettes in real-time. Perfect for designers, developers, and teams building the next generation of products.',
  getStartedBtn: 'Start Designing',
  learnMoreBtn: 'View Documentation',
  cardTitle: 'Powerful Features',
  features: [
    {
      title: 'Live Preview',
      description: 'See your color changes instantly across a complete product demo. Test colors in real components before committing.',
    },
    {
      title: 'Smart Palettes',
      description: 'Generate harmonious color schemes using complementary, triadic, and analogous color theory algorithms.',
    },
    {
      title: 'Accessibility First',
      description: 'Built-in WCAG contrast checker ensures your colors meet accessibility standards (AA & AAA).',
    },
    {
      title: 'Easy Export',
      description: 'Export as CSS variables, Tailwind config, or JSON. Copy to clipboard with one click.',
    },
    {
      title: 'Custom Fonts',
      description: 'Upload and preview custom fonts with your color system. Support for TTF, OTF, and WOFF formats.',
    },
    {
      title: 'Dark Mode Ready',
      description: 'Design for both light and dark modes simultaneously with automatic contrast adjustments.',
    },
  ],
  footerCategories: [
    {
      name: 'Product',
      links: ['Features', 'Pricing', 'Roadmap'],
    },
    {
      name: 'Developers',
      links: ['Documentation', 'API Reference', 'GitHub'],
    },
    {
      name: 'Company',
      links: ['About', 'Blog', 'Contact'],
    },
  ],
  footerCopyright: '© 2024 Color Studio. Open source and free forever.',
};

interface ThemeContextType {
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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'color-studio-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ThemeState>(() => {
    // Try to load from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          colors: parsed.colors || { ...DEFAULT_PALETTE },
          isDark: parsed.isDark ?? false,
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

    // Default state
    return {
      colors: { ...DEFAULT_DARK_PALETTE },
      isDark: true,
      isRounded: true,
      fontSize: 'md',
      fontFamily: 'PlusJakartaSans',
      fontWeight: '400',
      textContent: { ...DEFAULT_TEXT_CONTENT },
    };
  });

  // Save to localStorage and update CSS variables when state changes
  useEffect(() => {
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }

    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', state.colors.primary);
    root.style.setProperty('--color-secondary', state.colors.secondary);
    root.style.setProperty('--color-accent', state.colors.accent);
    root.style.setProperty('--color-bg', state.colors.bg);
    root.style.setProperty('--color-text', state.colors.text);

    const fontSizeMap = { sm: '14px', md: '16px', lg: '18px' };
    root.style.setProperty('--font-size', fontSizeMap[state.fontSize]);

    const radiusMap = { true: '1rem', false: '0px' };
    root.style.setProperty('--radius', radiusMap[String(state.isRounded) as any]);

    // Set font family
    const fontFamily = state.customFontName ? state.customFontName : FONT_FAMILIES[state.fontFamily as keyof typeof FONT_FAMILIES];
    root.style.setProperty('--font-family', fontFamily || 'inherit');
    root.style.setProperty('--font-weight', state.fontWeight);

    // Load custom font if provided
    if (state.customFontUrl) {
      const fontFace = `
        @font-face {
          font-family: '${state.customFontName || 'CustomFont'}';
          src: url('${state.customFontUrl}') format('truetype');
          font-weight: normal;
        }
      `;

      let style = document.getElementById('custom-font-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'custom-font-style';
        document.head.appendChild(style);
      }
      style.textContent = fontFace;
    }

    if (state.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const updateColor = (key: keyof ColorPalette, value: string) => {
    setState((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const toggleDarkMode = () => {
    setState((prev) => {
      const newDark = !prev.isDark;
      const colors = newDark ? { ...prev.colors } : { ...prev.colors };

      // Keep the user's color choices but adjust background/text for dark mode if they're using defaults
      if (newDark) {
        // In dark mode, if using default light bg, switch to dark bg
        if (prev.colors.bg === '0 0% 100%') {
          colors.bg = '0 0% 12%';
          colors.text = '0 0% 95%';
        }
      } else {
        // In light mode
        if (prev.colors.bg === '0 0% 12%') {
          colors.bg = '0 0% 100%';
          colors.text = '0 0% 10%';
        }
      }

      return { ...prev, isDark: newDark, colors };
    });
  };

  const toggleRounded = () => {
    setState((prev) => ({ ...prev, isRounded: !prev.isRounded }));
  };

  const setFontSize = (size: 'sm' | 'md' | 'lg') => {
    setState((prev) => ({ ...prev, fontSize: size }));
  };

  const setFontFamily = (family: string) => {
    setState((prev) => ({
      ...prev,
      fontFamily: family,
      ...(prev.customFontName && {
        customFontUrl: undefined,
        customFontName: undefined,
      }),
    }));
  };

  const setFontWeight = (weight: '400' | '500' | '600' | '700' | '800') => {
    setState((prev) => ({ ...prev, fontWeight: weight }));
  };

  const setCustomFont = (url: string, name: string) => {
    setState((prev) => ({ ...prev, customFontUrl: url, customFontName: name }));
  };

  const generateRandomPalette = () => {
    // Generate a random base hue
    const baseHue = Math.floor(Math.random() * 360);

    // Choose a random harmony type for better aesthetics
    const harmonyType = ['complementary', 'triadic', 'analogous', 'split-complementary'][Math.floor(Math.random() * 4)];

    let hueOffsets = [0, 60, 120]; // Default: triadic

    if (harmonyType === 'complementary') {
      hueOffsets = [0, 180]; // Primary and complement
    } else if (harmonyType === 'analogous') {
      hueOffsets = [0, 30, 330]; // Adjacent colors
    } else if (harmonyType === 'split-complementary') {
      hueOffsets = [0, 150, 210]; // Complement split
    }

    // Vibrant saturation and lightness for modern look
    const saturation = Math.floor(Math.random() * 25 + 75); // 75-100% for vibrant
    const primaryLightness = Math.floor(Math.random() * 15 + 48); // 48-63% for good contrast

    // Create colors from harmony offsets
    const colors = hueOffsets.map((offset) => {
      const hue = (baseHue + offset) % 360;
      return `${hue} ${saturation}% ${primaryLightness}%`;
    });

    const bgLight = state.isDark ? '0 0% 12%' : '0 0% 100%';
    const textLight = state.isDark ? '0 0% 95%' : '0 0% 10%';

    setState((prev) => ({
      ...prev,
      colors: {
        primary: colors[0],
        secondary: colors[1],
        accent: colors.length > 2 ? colors[2] : `${(baseHue + 45) % 360} ${saturation}% ${primaryLightness}%`,
        bg: bgLight,
        text: textLight,
      },
    }));
  };

  const resetPalette = () => {
    setState((prev) => ({
      ...prev,
      colors: state.isDark ? { ...DEFAULT_DARK_PALETTE } : { ...DEFAULT_PALETTE },
    }));
  };

  const updateTextContent = (key: keyof TextContent, value: any) => {
    setState((prev) => ({
      ...prev,
      textContent: {
        ...prev.textContent,
        [key]: value,
      },
    }));
  };

  const resetTextContent = () => {
    setState((prev) => ({
      ...prev,
      textContent: { ...DEFAULT_TEXT_CONTENT },
    }));
  };

  const resetAllToDefaults = () => {
    // Clear navbar logo from localStorage
    localStorage.removeItem('navbar-logo');

    setState({
      colors: { ...DEFAULT_DARK_PALETTE },
      isDark: true,
      isRounded: true,
      fontSize: 'md',
      fontFamily: 'PlusJakartaSans',
      fontWeight: '400',
      textContent: { ...DEFAULT_TEXT_CONTENT },
    });
  };

  const applyPreset = (preset: ColorPreset) => {
    setState((prev) => ({
      ...prev,
      colors: { ...preset.colors },
    }));
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
        generateRandomPalette,
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
