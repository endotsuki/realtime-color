import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { hslToHex, hexToHsl } from '@/utils/colorUtils';
import { ColorPicker } from './ui/color-picker';
import { IconPaletteFilled } from '@tabler/icons-react';

interface ColorControlProps {
  label: string;
  value: string; // HSL string
  onChange: (value: string) => void;
}

interface ColorsSectionProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
  onColorChange: (colorKey: string, value: string) => void;
}

export const ColorControl = ({ label, value, onChange }: ColorControlProps) => {
  const hex = hslToHex(value);
  const [hexInput, setHexInput] = useState(hex);

  const handleColorPickerChange = useCallback(
    (newHex: string) => {
      setHexInput(newHex);
      onChange(hexToHsl(newHex));
    },
    [onChange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className='rounded-xl bg-background/60 p-3 ring-1 ring-border/50 backdrop-blur'
    >
      {/* Header */}
      <div className='mb-2 flex items-center justify-between'>
        <span className='text-sm font-medium text-foreground'>{label}</span>
        <span className='font-mono text-xs text-muted-foreground'>{hex}</span>
      </div>

      {/* Picker Row */}
      <div className='flex items-center gap-3'>
        <ColorPicker color={hex} onChange={handleColorPickerChange} label='' className='shrink-0' />

        <div className='flex-1 rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground'>{value}</div>
      </div>
    </motion.div>
  );
};

export const ColorsSection = ({ colors, onColorChange }: ColorsSectionProps) => {
  return (
    <motion.div
      className='space-y-3 rounded-lg bg-muted/40 p-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className='mb-2 flex items-center gap-2'>
        <IconPaletteFilled />
        <h2 className='text-xl font-semibold text-foreground'>Colors</h2>
      </div>
      <ColorControl label='Primary' value={colors.primary} onChange={(v) => onColorChange('primary', v)} />
      <ColorControl label='Secondary' value={colors.secondary} onChange={(v) => onColorChange('secondary', v)} />
      <ColorControl label='Accent' value={colors.accent} onChange={(v) => onColorChange('accent', v)} />
      <ColorControl label='Background' value={colors.bg} onChange={(v) => onColorChange('bg', v)} />
      <ColorControl label='Text' value={colors.text} onChange={(v) => onColorChange('text', v)} />
    </motion.div>
  );
};
