export const hslToHex = (hsl: string): string => {
  const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!match) return "#000000";

  let h = parseInt(match[1]);
  let s = parseInt(match[2]);
  let l = parseInt(match[3]);

  // Normalize to 0-1 range
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const red = Math.round(r * 255)
    .toString(16)
    .padStart(2, "0");
  const green = Math.round(g * 255)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.round(b * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${red}${green}${blue}`.toUpperCase();
};

export const hexToHsl = (hex: string): string => {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) % 6;
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h /= 6;
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
  const cleaned = hex.replace("#", "").toUpperCase();
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
