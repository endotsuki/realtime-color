'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { IconColorPicker, IconCopy } from '@tabler/icons-react';
import { HexColorPicker } from 'react-colorful';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { useState } from 'react';

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'css';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  isEyeDroppper?: boolean;
  className?: string;
}

// Helper functions to convert colors
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : hex;
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

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

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function formatColor(color: string, format: ColorFormat): string {
  switch (format) {
    case 'hex':
      return color;
    case 'rgb':
      return hexToRgb(color);
    case 'hsl':
      return hexToHsl(color);
    case 'css':
      return `--color: ${color};`;
    default:
      return color;
  }
}

export function ColorPicker({ color, onChange, label, isEyeDroppper = false, className }: ColorPickerProps) {
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex');

  function copyToClipboard() {
    const formattedColor = formatColor(color, colorFormat);
    navigator.clipboard.writeText(formattedColor);
    toast('Copied!', {
      description: `${formattedColor} copied to clipboard`,
      duration: 2000,
    });
  }

  async function useEyeDropper() {
    if (!('EyeDropper' in window)) {
      toast.error('Not supported', {
        description: 'Eyedropper is not supported in your browser',
        duration: 3000,
      });
      return;
    }

    try {
      // @ts-expect-error - EyeDropper is not in the TypeScript DOM types yet
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (e) {
      console.error('Error using eyedropper', e);
    }
  }

  return (
    <div className={cn('gap-2', className)}>
      <Label className='w-24'>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='h-8 w-12 border-2 p-0' style={{ backgroundColor: color }}>
            <span className='sr-only'>Pick a color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full space-y-2 bg-primary-foreground p-3'>
          <HexColorPicker color={color} onChange={onChange} className='w-full!' />
          <Select value={colorFormat} onValueChange={(v) => setColorFormat(v as ColorFormat)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select format...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='hex'>HEX</SelectItem>
              <SelectItem value='rgb'>RGB</SelectItem>
              <SelectItem value='hsl'>HSL</SelectItem>
              <SelectItem value='css'>CSS</SelectItem>
            </SelectContent>
          </Select>
          <div className='relative'>
            <Input value={formatColor(color, colorFormat)} readOnly className='pr-10' />
            <Button variant='ghost' size='icon' onClick={copyToClipboard} className='absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2'>
              <IconCopy className='h-4 w-4' />
              <span className='sr-only'>Copy color</span>
            </Button>
          </div>

          {isEyeDroppper && (
            <div className='mt-2 flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={useEyeDropper}
                className='h-10 w-10 border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200'
                style={{ borderRadius: '6px' }}
              >
                <IconColorPicker className='h-4 w-4' />
                <span className='sr-only'>Pick color</span>
              </Button>

              <div className='h-10 flex-1' style={{ backgroundColor: color, borderRadius: '6px' }} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
