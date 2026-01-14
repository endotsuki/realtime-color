import { LIGHT_PRESETS } from './lightPresets';
import { DARK_PRESETS } from './darkPresets';

export interface ColorPreset {
  name: string;
  colors: ColorPalette;
  mode: 'light' | 'dark';
  description?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}

// Re-export presets from separate files
export { LIGHT_PRESETS } from './lightPresets';
export { DARK_PRESETS } from './darkPresets';

export const ALL_COLOR_PRESETS: ColorPreset[] = [...LIGHT_PRESETS, ...DARK_PRESETS];

/**
 * Get presets filtered by mode
 * @param mode - 'light' | 'dark' | 'all'
 */
export const getColorPresets = (mode: 'light' | 'dark' | 'all' = 'all'): ColorPreset[] => {
  if (mode === 'light') return LIGHT_PRESETS;
  if (mode === 'dark') return DARK_PRESETS;
  return ALL_COLOR_PRESETS;
};
