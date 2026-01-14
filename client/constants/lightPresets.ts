import { ColorPreset } from './colorPresets';

export const LIGHT_PRESETS: ColorPreset[] = [
  // Professional & Corporate
  {
    name: 'Corporate Blue',
    description: 'Professional business palette',
    mode: 'light',
    colors: {
      primary: '215 85% 45%', // Corporate blue
      secondary: '200 75% 50%', // Sky blue
      accent: '280 70% 55%', // Professional purple
      bg: '0 0% 100%',
      text: '215 30% 12%',
    },
  },
  {
    name: 'Executive',
    description: 'Premium corporate theme',
    mode: 'light',
    colors: {
      primary: '220 80% 48%', // Executive blue
      secondary: '210 70% 50%', // Professional blue
      accent: '45 85% 50%', // Gold accent
      bg: '0 0% 100%',
      text: '220 25% 12%',
    },
  },
  {
    name: 'Modern Office',
    description: 'Clean workspace palette',
    mode: 'light',
    colors: {
      primary: '205 85% 48%', // Modern blue
      secondary: '190 75% 50%', // Teal
      accent: '320 75% 55%', // Pink accent
      bg: '0 0% 100%',
      text: '205 25% 12%',
    },
  },
  {
    name: 'Professional Sage',
    description: 'Sophisticated green palette',
    mode: 'light',
    colors: {
      primary: '155 60% 42%', // Sage green
      secondary: '170 65% 45%', // Teal
      accent: '35 85% 50%', // Warm accent
      bg: '0 0% 100%',
      text: '155 25% 12%',
    },
  },
  {
    name: 'Tech Corporate',
    description: 'Modern tech company theme',
    mode: 'light',
    colors: {
      primary: '210 90% 48%', // Tech blue
      secondary: '195 80% 50%', // Cyan
      accent: '280 75% 55%', // Purple
      bg: '0 0% 100%',
      text: '210 30% 10%',
    },
  },

  // Vibrant & Energetic
  {
    name: 'Sunset Glow',
    description: 'Warm and energetic palette',
    mode: 'light',
    colors: {
      primary: '20 90% 52%', // Sunset orange
      secondary: '340 85% 52%', // Coral red
      accent: '50 95% 50%', // Golden yellow
      bg: '0 0% 100%',
      text: '20 30% 12%',
    },
  },
  {
    name: 'Electric Pop',
    description: 'Bold and vibrant theme',
    mode: 'light',
    colors: {
      primary: '330 90% 52%', // Hot pink
      secondary: '280 85% 52%', // Purple
      accent: '190 90% 48%', // Cyan
      bg: '0 0% 100%',
      text: '330 25% 10%',
    },
  },
  {
    name: 'Tropical',
    description: 'Vibrant tropical palette',
    mode: 'light',
    colors: {
      primary: '165 80% 42%', // Tropical teal
      secondary: '145 75% 45%', // Jungle green
      accent: '25 95% 52%', // Coral
      bg: '0 0% 100%',
      text: '165 30% 12%',
    },
  },
  {
    name: 'Citrus Fresh',
    description: 'Zesty and energetic',
    mode: 'light',
    colors: {
      primary: '45 95% 48%', // Lemon
      secondary: '35 90% 52%', // Orange
      accent: '155 80% 45%', // Lime
      bg: '0 0% 100%',
      text: '45 30% 12%',
    },
  },
  {
    name: 'Berry Blast',
    description: 'Sweet berry colors',
    mode: 'light',
    colors: {
      primary: '340 85% 50%', // Raspberry
      secondary: '320 80% 52%', // Strawberry
      accent: '270 80% 55%', // Grape
      bg: '0 0% 100%',
      text: '340 25% 12%',
    },
  },

  // Nature Inspired
  {
    name: 'Forest Morning',
    description: 'Fresh woodland palette',
    mode: 'light',
    colors: {
      primary: '150 65% 42%', // Forest green
      secondary: '130 60% 45%', // Moss
      accent: '40 85% 52%', // Amber
      bg: '0 0% 100%',
      text: '150 30% 12%',
    },
  },
  {
    name: 'Ocean Breeze',
    description: 'Coastal fresh theme',
    mode: 'light',
    colors: {
      primary: '200 85% 48%', // Ocean blue
      secondary: '180 80% 48%', // Teal
      accent: '45 90% 50%', // Sand
      bg: '0 0% 100%',
      text: '200 30% 12%',
    },
  },
  {
    name: 'Meadow',
    description: 'Spring meadow palette',
    mode: 'light',
    colors: {
      primary: '100 70% 42%', // Grass green
      secondary: '140 65% 45%', // Fresh green
      accent: '320 80% 55%', // Wildflower pink
      bg: '0 0% 100%',
      text: '100 30% 12%',
    },
  },
  {
    name: 'Mountain Air',
    description: 'Cool mountain atmosphere',
    mode: 'light',
    colors: {
      primary: '210 75% 48%', // Mountain blue
      secondary: '195 70% 48%', // Sky blue
      accent: '30 85% 52%', // Sunset
      bg: '0 0% 100%',
      text: '210 25% 12%',
    },
  },
  {
    name: 'Garden Fresh',
    description: 'Botanical garden theme',
    mode: 'light',
    colors: {
      primary: '155 70% 42%', // Garden green
      secondary: '175 65% 45%', // Jade
      accent: '35 90% 52%', // Marigold
      bg: '0 0% 100%',
      text: '155 30% 12%',
    },
  },

  // Soft & Pastel
  {
    name: 'Lavender Dreams',
    description: 'Soft purple palette',
    mode: 'light',
    colors: {
      primary: '260 70% 58%', // Lavender
      secondary: '240 65% 60%', // Periwinkle
      accent: '320 75% 60%', // Pink
      bg: '0 0% 100%',
      text: '260 25% 12%',
    },
  },
  {
    name: 'Mint Cream',
    description: 'Fresh and clean palette',
    mode: 'light',
    colors: {
      primary: '165 65% 48%', // Mint
      secondary: '180 70% 48%', // Aqua
      accent: '280 70% 58%', // Lavender
      bg: '0 0% 100%',
      text: '165 25% 12%',
    },
  },
  {
    name: 'Peach Sorbet',
    description: 'Sweet pastel theme',
    mode: 'light',
    colors: {
      primary: '20 85% 60%', // Peach
      secondary: '340 80% 62%', // Coral
      accent: '280 70% 58%', // Lilac
      bg: '0 0% 100%',
      text: '20 25% 12%',
    },
  },
  {
    name: 'Sky Blue',
    description: 'Soft sky palette',
    mode: 'light',
    colors: {
      primary: '200 75% 55%', // Sky blue
      secondary: '190 70% 55%', // Light cyan
      accent: '320 75% 60%', // Rose
      bg: '0 0% 100%',
      text: '200 25% 12%',
    },
  },
  {
    name: 'Cherry Blossom',
    description: 'Delicate pink theme',
    mode: 'light',
    colors: {
      primary: '340 70% 60%', // Cherry
      secondary: '320 65% 62%', // Blush
      accent: '160 70% 48%', // Stem green
      bg: '0 0% 100%',
      text: '340 25% 12%',
    },
  },

  // Modern & Minimal
  {
    name: 'Clean Slate',
    description: 'Minimal modern palette',
    mode: 'light',
    colors: {
      primary: '215 75% 48%', // Modern blue
      secondary: '200 65% 50%', // Cool gray-blue
      accent: '160 70% 48%', // Teal accent
      bg: '0 0% 100%',
      text: '215 20% 12%',
    },
  },
  {
    name: 'Monochrome Pro',
    description: 'Professional grayscale',
    mode: 'light',
    colors: {
      primary: '0 0% 25%', // Dark gray
      secondary: '0 0% 40%', // Medium gray
      accent: '210 85% 48%', // Blue accent
      bg: '0 0% 100%',
      text: '0 0% 10%',
    },
  },
  {
    name: 'Scandinavian',
    description: 'Nordic minimal design',
    mode: 'light',
    colors: {
      primary: '205 70% 48%', // Nordic blue
      secondary: '190 60% 48%', // Ice blue
      accent: '35 85% 50%', // Warm wood
      bg: '0 0% 100%',
      text: '205 20% 12%',
    },
  },
  {
    name: 'Swiss Design',
    description: 'Clean Swiss style',
    mode: 'light',
    colors: {
      primary: '0 85% 48%', // Swiss red
      secondary: '0 0% 30%', // Charcoal
      accent: '210 75% 48%', // Blue
      bg: '0 0% 100%',
      text: '0 0% 10%',
    },
  },
  {
    name: 'Bauhaus',
    description: 'Modern geometric palette',
    mode: 'light',
    colors: {
      primary: '210 90% 45%', // Primary blue
      secondary: '0 90% 48%', // Primary red
      accent: '50 95% 48%', // Primary yellow
      bg: '0 0% 100%',
      text: '0 0% 10%',
    },
  },

  // Warm & Inviting
  {
    name: 'Autumn Harvest',
    description: 'Warm autumn colors',
    mode: 'light',
    colors: {
      primary: '25 85% 48%', // Pumpkin
      secondary: '35 80% 50%', // Amber
      accent: '280 70% 55%', // Purple
      bg: '0 0% 100%',
      text: '25 30% 12%',
    },
  },
  {
    name: 'Golden Hour',
    description: 'Warm sunset tones',
    mode: 'light',
    colors: {
      primary: '40 90% 48%', // Gold
      secondary: '30 85% 50%', // Orange
      accent: '280 75% 52%', // Purple
      bg: '0 0% 100%',
      text: '40 30% 12%',
    },
  },
  {
    name: 'Terracotta',
    description: 'Earthy warm palette',
    mode: 'light',
    colors: {
      primary: '15 75% 48%', // Terracotta
      secondary: '30 70% 50%', // Clay
      accent: '160 70% 45%', // Sage
      bg: '0 0% 100%',
      text: '15 30% 12%',
    },
  },
  {
    name: 'Cinnamon Spice',
    description: 'Cozy spice tones',
    mode: 'light',
    colors: {
      primary: '25 80% 48%', // Cinnamon
      secondary: '35 75% 50%', // Nutmeg
      accent: '280 70% 55%', // Lavender
      bg: '0 0% 100%',
      text: '25 30% 12%',
    },
  },
  {
    name: 'Honey Warmth',
    description: 'Sweet honey palette',
    mode: 'light',
    colors: {
      primary: '40 85% 48%', // Honey
      secondary: '45 90% 48%', // Amber
      accent: '200 75% 48%', // Blue contrast
      bg: '0 0% 100%',
      text: '40 30% 12%',
    },
  },

  // Cool & Fresh
  {
    name: 'Arctic Fresh',
    description: 'Cool refreshing palette',
    mode: 'light',
    colors: {
      primary: '190 85% 48%', // Ice blue
      secondary: '200 80% 48%', // Glacier
      accent: '280 75% 55%', // Cool purple
      bg: '0 0% 100%',
      text: '190 30% 12%',
    },
  },
  {
    name: 'Winter Frost',
    description: 'Crisp winter theme',
    mode: 'light',
    colors: {
      primary: '200 75% 48%', // Frost blue
      secondary: '210 70% 48%', // Ice
      accent: '320 75% 55%', // Berry
      bg: '0 0% 100%',
      text: '200 25% 12%',
    },
  },
  {
    name: 'Glacier',
    description: 'Cool mountain palette',
    mode: 'light',
    colors: {
      primary: '195 80% 48%', // Glacier blue
      secondary: '185 75% 48%', // Ice cyan
      accent: '280 70% 55%', // Aurora purple
      bg: '0 0% 100%',
      text: '195 30% 12%',
    },
  },
  {
    name: 'Nordic Cool',
    description: 'Scandinavian cool tones',
    mode: 'light',
    colors: {
      primary: '205 75% 48%', // Nordic blue
      secondary: '195 70% 48%', // Ice blue
      accent: '160 65% 45%', // Evergreen
      bg: '0 0% 100%',
      text: '205 25% 12%',
    },
  },
  {
    name: 'Peppermint',
    description: 'Fresh mint palette',
    mode: 'light',
    colors: {
      primary: '170 75% 42%', // Peppermint
      secondary: '160 70% 45%', // Mint
      accent: '340 80% 52%', // Candy red
      bg: '0 0% 100%',
      text: '170 30% 12%',
    },
  },

  // Bold & Confident
  {
    name: 'Royal Purple',
    description: 'Regal purple theme',
    mode: 'light',
    colors: {
      primary: '270 80% 48%', // Royal purple
      secondary: '260 75% 50%', // Purple
      accent: '45 90% 48%', // Gold
      bg: '0 0% 100%',
      text: '270 30% 12%',
    },
  },
  {
    name: 'Ruby Red',
    description: 'Bold red palette',
    mode: 'light',
    colors: {
      primary: '350 85% 48%', // Ruby
      secondary: '340 80% 50%', // Crimson
      accent: '210 80% 48%', // Blue contrast
      bg: '0 0% 100%',
      text: '350 30% 12%',
    },
  },
  {
    name: 'Emerald Green',
    description: 'Rich green palette',
    mode: 'light',
    colors: {
      primary: '155 75% 42%', // Emerald
      secondary: '145 70% 45%', // Green
      accent: '280 75% 52%', // Purple
      bg: '0 0% 100%',
      text: '155 30% 12%',
    },
  },
  {
    name: 'Sapphire Blue',
    description: 'Deep blue gemstone',
    mode: 'light',
    colors: {
      primary: '220 85% 45%', // Sapphire
      secondary: '210 80% 48%', // Blue
      accent: '45 90% 48%', // Gold
      bg: '0 0% 100%',
      text: '220 30% 12%',
    },
  },
  {
    name: 'Tangerine',
    description: 'Vibrant orange theme',
    mode: 'light',
    colors: {
      primary: '30 95% 50%', // Tangerine
      secondary: '20 90% 52%', // Orange
      accent: '280 75% 52%', // Purple
      bg: '0 0% 100%',
      text: '30 30% 12%',
    },
  },
];
