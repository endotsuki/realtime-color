import { hslToHex, hexToHsl } from '@/utils/colorUtils';
import { ColorPicker } from './ui/color-picker';
import { IconPaletteFilled, IconCopy, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}

interface ColorsSectionProps {
  colors: Colors;
  onColorChange: (colorKey: keyof Colors, value: string) => void;
}

const ColorControl = ({ label, value, onChange }: ColorControlProps) => {
  const hex = hslToHex(value);
  const [copied, setCopied] = useState(false);

  const handleChange = (newHex: string) => {
    onChange(hexToHsl(newHex));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='group flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 p-3 transition-all hover:border-border hover:bg-background/60'>
      <ColorPicker color={hex} onChange={handleChange} label='' className='shrink-0' />

      <div className='flex-1'>
        <div className='text-sm font-medium text-foreground'>{label}</div>
        <div className='font-mono text-xs text-muted-foreground'>{hex}</div>
      </div>

      <button onClick={handleCopy} className='rounded-md p-1.5 opacity-0 transition-all hover:bg-muted group-hover:opacity-100'>
        {copied ? <IconCheck size={16} className='text-green-600' /> : <IconCopy size={16} className='text-muted-foreground' />}
      </button>
    </div>
  );
};

export const ColorsSection = ({ colors, onColorChange }: ColorsSectionProps) => {
  return (
    <div className='space-y-3 rounded-lg bg-muted/30 p-4'>
      <div className='mb-1 flex items-center gap-2'>
        <IconPaletteFilled size={20} className='text-primary' />
        <h2 className='text-lg font-semibold text-foreground'>Colors</h2>
      </div>

      <div className='space-y-2'>
        <ColorControl label='Primary' value={colors.primary} onChange={(v) => onColorChange('primary', v)} />
        <ColorControl label='Secondary' value={colors.secondary} onChange={(v) => onColorChange('secondary', v)} />
        <ColorControl label='Accent' value={colors.accent} onChange={(v) => onColorChange('accent', v)} />
        <ColorControl label='Background' value={colors.bg} onChange={(v) => onColorChange('bg', v)} />
        <ColorControl label='Text' value={colors.text} onChange={(v) => onColorChange('text', v)} />
      </div>
    </div>
  );
};
