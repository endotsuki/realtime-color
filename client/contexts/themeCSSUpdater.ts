import { ThemeState } from './themeTypes';
import { FONT_FAMILIES } from './themeConstants';

export const updateCSSVariables = (state: ThemeState): void => {
  const root = document.documentElement;

  // Update color variables
  root.style.setProperty('--color-primary', state.colors.primary);
  root.style.setProperty('--color-secondary', state.colors.secondary);
  root.style.setProperty('--color-accent', state.colors.accent);
  root.style.setProperty('--color-bg', state.colors.bg);
  root.style.setProperty('--color-text', state.colors.text);

  // Update font size
  const fontSizeMap = { sm: '14px', md: '16px', lg: '18px' };
  root.style.setProperty('--font-size', fontSizeMap[state.fontSize]);

  // Update border radius
  const radiusMap = { true: '1rem', false: '0px' };
  root.style.setProperty('--radius', radiusMap[String(state.isRounded) as keyof typeof radiusMap]);

  // Update font family
  const fontFamily = state.customFontName ? state.customFontName : FONT_FAMILIES[state.fontFamily as keyof typeof FONT_FAMILIES];
  root.style.setProperty('--font-family', fontFamily || 'inherit');
  root.style.setProperty('--font-weight', state.fontWeight);

  // Update dark mode class
  if (state.isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const loadCustomFont = (fontUrl: string, fontName: string): void => {
  const fontFace = `
    @font-face {
      font-family: '${fontName || 'CustomFont'}';
      src: url('${fontUrl}') format('truetype');
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
};
