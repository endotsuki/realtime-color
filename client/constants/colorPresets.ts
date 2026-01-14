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

// Light Mode Presets
export const LIGHT_PRESETS: ColorPreset[] = [
  {
    name: 'Aurora',
    description: 'Cool and fresh modern palette',
    mode: 'light',
    colors: {
      primary: '220 90% 56%', // Modern blue
      secondary: '280 90% 56%', // Purple
      accent: '340 95% 55%', // Vibrant pink
      bg: '0 0% 100%',
      text: '0 0% 10%',
    },
  },
  {
    name: 'Sunset',
    description: 'Warm and energetic palette',
    mode: 'light',
    colors: {
      primary: '20 95% 55%', // Warm orange
      secondary: '340 85% 55%', // Red
      accent: '50 95% 55%', // Golden yellow
      bg: '0 0% 100%',
      text: '0 0% 10%',
    },
  },
  {
    name: 'Forest',
    description: 'Natural and calming palette',
    mode: 'light',
    colors: {
      primary: '160 70% 45%', // Teal
      secondary: '100 60% 50%', // Green
      accent: '30 85% 60%', // Warm accent
      bg: '0 0% 100%',
      text: '160 30% 15%',
    },
  },
  {
    name: 'Ocean',
    description: 'Deep and professional palette',
    mode: 'light',
    colors: {
      primary: '210 80% 50%', // Ocean blue
      secondary: '180 85% 50%', // Cyan
      accent: '45 95% 55%', // Bright yellow
      bg: '0 0% 100%',
      text: '210 20% 15%',
    },
  },
  {
    name: 'Monochrome',
    description: 'Minimalist and elegant palette',
    mode: 'light',
    colors: {
      primary: '0 0% 20%', // Dark gray
      secondary: '0 0% 40%', // Medium gray
      accent: '280 100% 60%', // Accent purple
      bg: '0 0% 100%',
      text: '0 0% 10%',
    },
  },
  {
    name: 'Lavender',
    description: 'Soft and friendly pastel palette',
    mode: 'light',
    colors: {
      primary: '250 80% 60%', // Lavender
      secondary: '220 70% 55%', // Soft blue
      accent: '320 85% 65%', // Pink accent
      bg: '0 0% 100%',
      text: '240 20% 15%',
    },
  },
  {
    name: 'Mint',
    description: 'Fresh and clean light palette',
    mode: 'light',
    colors: {
      primary: '160 70% 45%', // Mint green
      secondary: '190 80% 45%', // Aqua
      accent: '45 90% 55%', // Soft yellow
      bg: '0 0% 100%',
      text: '160 25% 15%',
    },
  },
  {
    name: 'Rose',
    description: 'Elegant and warm light palette',
    mode: 'light',
    colors: {
      primary: '350 85% 60%', // Rose
      secondary: '20 80% 55%', // Peach
      accent: '280 70% 60%', // Soft purple
      bg: '0 0% 100%',
      text: '350 20% 15%',
    },
  },
];

// Dark Mode Presets
export const DARK_PRESETS: ColorPreset[] = [
  {
    name: 'Midnight',
    description: 'Dark mode professional palette',
    mode: 'dark',
    colors: {
      primary: '260 90% 60%', // Bright purple
      secondary: '220 90% 60%', // Bright blue
      accent: '40 95% 60%', // Bright amber
      bg: '0 0% 12%',
      text: '0 0% 95%',
    },
  },
  {
    name: 'Carbon',
    description: 'High-contrast modern dark palette',
    mode: 'dark',
    colors: {
      primary: '210 90% 60%', // Bright blue
      secondary: '160 80% 55%', // Green
      accent: '45 95% 60%', // Amber
      bg: '220 15% 10%',
      text: '0 0% 95%',
    },
  },
  {
    name: 'Crimson Night',
    description: 'Bold and dramatic dark palette',
    mode: 'dark',
    colors: {
      primary: '350 85% 60%', // Crimson
      secondary: '20 90% 55%', // Orange
      accent: '280 80% 65%', // Violet
      bg: '350 15% 8%',
      text: '0 0% 95%',
    },
  },
  {
    name: 'Neon',
    description: 'Vibrant cyberpunk dark palette',
    mode: 'dark',
    colors: {
      primary: '190 100% 55%', // Neon cyan
      secondary: '290 100% 65%', // Neon purple
      accent: '50 100% 60%', // Neon yellow
      bg: '230 20% 8%',
      text: '0 0% 96%',
    },
  },
  {
    name: 'Slate',
    description: 'Subtle and professional dark palette',
    mode: 'dark',
    colors: {
      primary: '215 30% 60%', // Muted blue
      secondary: '215 20% 45%', // Slate gray
      accent: '160 60% 50%', // Teal
      bg: '215 20% 12%',
      text: '0 0% 94%',
    },
  },
  {
    name: 'Obsidian',
    description: 'Deep and sleek dark palette',
    mode: 'dark',
    colors: {
      primary: '280 85% 55%', // Purple
      secondary: '220 80% 55%', // Blue
      accent: '60 90% 55%', // Yellow
      bg: '0 0% 8%',
      text: '0 0% 97%',
    },
  },
  {
    name: 'Nebula',
    description: 'Cosmic and vibrant dark palette',
    mode: 'dark',
    colors: {
      primary: '270 100% 60%', // Magenta
      secondary: '200 100% 60%', // Cyan
      accent: '40 100% 60%', // Golden
      bg: '260 20% 10%',
      text: '0 0% 96%',
    },
  },
  {
    name: 'Forest Night',
    description: 'Deep nature-inspired dark palette',
    mode: 'dark',
    colors: {
      primary: '160 60% 50%', // Teal
      secondary: '120 50% 50%', // Green
      accent: '45 85% 55%', // Warm accent
      bg: '160 20% 10%',
      text: '0 0% 94%',
    },
  },
];

// Combined presets for backward compatibility
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
