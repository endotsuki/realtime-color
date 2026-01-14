import { ColorPalette, TextContent } from './themeTypes';

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

export const STORAGE_KEY = 'color-studio-theme';
