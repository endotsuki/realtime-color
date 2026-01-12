/**
 * HSL format: "hue saturation% lightness%"
 * e.g., "265 85% 50%"
 */

export const hslToHex = (hsl: string): string => {
  const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!match) return '#000000';

  const [, h, s, l] = match.map(Number);

  const c = ((100 - Math.abs(2 * l - 100)) / 100) * (s / 100);
  const x = c * (1 - (((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const red = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, '0');
  const green = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${red}${green}${blue}`.toUpperCase();
};

export const hexToHsl = (hex: string): string => {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const hue = Math.round(h * 360);
  const saturation = Math.round(s * 100);
  const lightness = Math.round(l * 100);

  return `${hue} ${saturation}% ${lightness}%`;
};

// Convert HSL to RGB for contrast calculation
const hslToRgb = (hsl: string): [number, number, number] => {
  const hex = hslToHex(hsl);
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return [r, g, b];
};

// WCAG contrast ratio calculation
export const getContrastRatio = (color1: string, color2: string): number => {
  const [r1, g1, b1] = hslToRgb(color1);
  const [r2, g2, b2] = hslToRgb(color2);

  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((x) => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Check if contrast is sufficient (WCAG AA standard)
export const hasGoodContrast = (color1: string, color2: string): boolean => {
  return getContrastRatio(color1, color2) >= 4.5; // AA standard
};

export const validateHexColor = (hex: string): boolean => {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

// Format hex for display
export const formatHex = (hex: string): string => {
  const cleaned = hex.replace('#', '').toUpperCase();
  return `#${cleaned}`;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Generate CSS variables export
export const generateCSSVariables = (palette: {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}): string => {
  return `:root {
  --color-primary: ${palette.primary};
  --color-secondary: ${palette.secondary};
  --color-accent: ${palette.accent};
  --color-bg: ${palette.bg};
  --color-text: ${palette.text};
}`;
};

// Generate Tailwind config snippet
export const generateTailwindConfig = (palette: {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}): string => {
  const hexPrimary = hslToHex(palette.primary);
  const hexSecondary = hslToHex(palette.secondary);
  const hexAccent = hslToHex(palette.accent);
  const hexBg = hslToHex(palette.bg);
  const hexText = hslToHex(palette.text);

  return `export default {
  theme: {
    extend: {
      colors: {
        primary: '${hexPrimary}',
        secondary: '${hexSecondary}',
        accent: '${hexAccent}',
        background: '${hexBg}',
        text: '${hexText}',
      }
    }
  }
}`;
};
